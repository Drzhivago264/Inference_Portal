import json
import uuid
import pytz
import dspy

from urllib.parse import urlsplit
from pydantic import ValidationError
from decouple import config
from channels.generic.websocket import AsyncWebsocketConsumer

from server.utils.llm_toolbox import (
    Emotion,
    TopicClassification,
    SummarizeDocument,
    ParaphaseDocument,
    ChangeWrittingStyle
)
from server.consumers.pydantic_validator import ToolSchema
from server.utils.async_.async_query_database import QueryDBMixin
from server.utils.async_.async_manage_ec2 import (
    ManageEC2Mixin, 
    update_server_status_in_db_async
)

from django.utils import timezone



class Consumer(AsyncWebsocketConsumer, ManageEC2Mixin, QueryDBMixin):

    async def connect(self):
        self.url = self.scope["url_route"]["kwargs"]["key"]
        self.timezone = self.scope["url_route"]["kwargs"]["tz"]
        self.time = timezone.localtime(timezone.now(), pytz.timezone(
            self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
        self.room_group_name = "chat_%s" % self.url
        self.is_session_start_node = None
        self.user = self.scope['user']
        self.key_object = await self.get_key_object()
        self.p_type = "toolbox"
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        is_authorised = await self.check_permission(permission_code='server.allow_toolbox', destination="Toolbox")
        if is_authorised:
            await self.send(text_data=json.dumps({"message": "You are currently using Async backend. Default to GPT4 or choose model on the right.", "role": "Server", "time": self.time}))


    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
    # Receive message from WebSocket

    async def receive(self, text_data):
        try:
            validated = ToolSchema.model_validate_json(text_data)

            if not self.key_object:
                await self.send(text_data=json.dumps({"message": "Key is incorrect, disconnected! You need to log in first", "role": "Server", "time": self.time}))
                await self.disconnect({'code': 3003})
            elif not validated.message.strip():
                await self.send(text_data=json.dumps({"message": "Empty string recieved", "role": "Server", "time": self.time}))
            elif self.key_object and validated.message.strip():
                message = validated.message
                tool = validated.tool
                self.top_p = validated.top_p
                self.max_tokens = validated.max_tokens
                self.frequency_penalty = validated.frequency_penalty
                self.presence_penalty = validated.presence_penalty
                self.temperature = validated.temperature
                self.choosen_model = validated.choosen_model
                role = validated.role
                unique_response_id = str(uuid.uuid4())
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name, {"type": "chat_message",
                                           "role": role,
                                           "message": message,
                                           "credit": self.key_object.credit,
                                           "unique": unique_response_id,
                                           }
                )
                await self.channel_layer.group_send(
                    self.room_group_name, {"type": "chat_message",
                                           "role": tool,
                                           "message": message,
                                           "credit": self.key_object.credit,
                                           "unique": unique_response_id,
                                           "emotion_list": validated.emotion_list,
                                           "topic_list": validated.topic_list,
                                           "style_list": validated.style_list,
                                           "number_of_word": validated.number_of_word,
                                           }
                )
        except ValidationError as e:
            await self.send(text_data=json.dumps({"message": f"Error: {e.errors()}", "role": "Server", "time": self.time}))
    # Receive message from room group

    async def chat_message(self, event):
        message = event["message"]
        role = event["role"]
        credit = event["credit"]
        unique_response_id = event['unique']
        self.time = timezone.localtime(timezone.now(), pytz.timezone(
            self.timezone)).strftime('%Y-%m-%d %H:%M:%S')
        # Send message to WebSocket
        if role == "Human" or role == "Server":
            await self.send(text_data=json.dumps({"message": "\n" + message, "role": role,  "time": self.time}))
            if role == "Human":
                await self.send(text_data=json.dumps({"holder": "place_holder", "holderid":  unique_response_id, "role": self.choosen_model, "time": self.time, "credit": credit}))
        else:
            try:
                llm = await self.get_model()
                if llm:
                    if llm.is_self_host:
                        url, instance_id, server_status = await self.get_model_url_async()
                        split_url = urlsplit(url)
                        await update_server_status_in_db_async(
                            instance_id=instance_id, update_type="time")
                        if server_status == "running":
                            client = dspy.HFClientVLLM(model=llm.base, port=80, url=split_url.scheme+"://"+split_url.hostname)
                        else:
                            await self.manage_ec2_on_inference(server_status, instance_id)
                    else:
                        client = dspy.OpenAI(model=self.choosen_model,
                                            max_tokens=self.max_tokens,
                                            top_p=self.top_p,
                                            presence_penalty=self.presence_penalty,
                                            frequency_penalty=self.frequency_penalty,
                                            temperature=self.temperature,
                                            api_key=config("GPT_KEY"))
                    dspy.configure(lm=client)
                    if not llm.is_self_host:
                        if role == "summary":
                            number_of_word = event['number_of_word']
                            if number_of_word is not None and isinstance(number_of_word, int):
                                Summarizer_ = SummarizeDocument
                                Summarizer_.__doc__ = f"Compress document in {number_of_word} words."
                            else:
                                Summarizer_ = SummarizeDocument
                            summarize = dspy.Predict(Summarizer_)

                            response = summarize(document=message)
                            await self.send(text_data=json.dumps({"message": response.summary, "stream_id":  unique_response_id, "credit": credit}))

                        elif role == "sentiment":
                            predict = dspy.Predict('document -> sentiment')
                            response = predict(document=message)
                            await self.send(text_data=json.dumps({"message": response.sentiment, "stream_id":  unique_response_id, "credit": credit}))
                        elif role == "emotion":
                            emotion_list = event['emotion_list']
                            if emotion_list is not None:
                                Emotion_ = Emotion
                                Emotion_.__doc__ = f"""Classify emotion among {emotion_list}."""
                            else:
                                Emotion_ = Emotion
                            predict = dspy.Predict(Emotion_)
                            response = predict(sentence=message)
                            await self.send(text_data=json.dumps({"message": response.emotion, "stream_id":  unique_response_id, "credit": credit}))
                        elif role == "topic":
                            topic_list = event['topic_list']
                            if topic_list is not None:
                                Topic_ = TopicClassification
                                Topic_.__doc__ = f"""Classify topic among {topic_list}."""
                            else:
                                Topic_ = TopicClassification
                            predict = dspy.Predict(Topic_)                            
                            response = predict(document=message)
                            await self.send(text_data=json.dumps({"message": response.topic, "stream_id":  unique_response_id, "credit": credit}))
                        elif role == "paraphrase":
                            paraphaser = dspy.Predict(ParaphaseDocument)
                            response = paraphaser(document=message)
                            await self.send(text_data=json.dumps({"message": response.paraphased, "stream_id":  unique_response_id, "credit": credit}))
                        elif role == "restyle":
                            new_style = event['style_list']
                            if new_style is not None:
                                Restyler_ = ChangeWrittingStyle
                                Restyler_.__doc__ = f"""Writing document in {new_style} style."""
                            else:
                                Restyler_ = ChangeWrittingStyle
                            restyler = dspy.Predict(Restyler_)
                            response = restyler(document=message)
                            await self.send(text_data=json.dumps({"message": response.styled, "stream_id":  unique_response_id, "credit": credit}))
                        else:
                            await self.send(text_data=json.dumps({"message": message, "stream_id":  unique_response_id, "credit": credit}))
                    else:
                        await self.send(text_data=json.dumps({"message": "There is an unknown bug with dSpy and vLLM, sorry for the inconvenience,try openai models for now", "stream_id":  unique_response_id, "credit": credit}))
            except Exception as e:
                await self.send(text_data=json.dumps({"message": f"Error: {e}", "role": "Server", "time": self.time}))
