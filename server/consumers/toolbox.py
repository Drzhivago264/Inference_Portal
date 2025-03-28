import json
import uuid
from urllib.parse import urlsplit

import dspy
import pytz
from decouple import config
from django.utils import timezone
from pydantic import ValidationError

from server.consumers.base_chatbot import BaseChatbot
from server.consumers.pydantic_validator import ToolSchema
from server.models.llm_server import InferenceServer
from server.models.log import PromptResponse
from server.utils.async_.async_manage_ec2 import update_server_status_in_db_async
from server.utils.llm_toolbox import (
    ChangeWrittingStyle,
    Emotion,
    ParaphaseDocument,
    SummarizeDocument,
    TopicClassification,
)


class Consumer(BaseChatbot):

    def __init__(self):
        super().__init__()
        self.backend = None
        self.permission_code = "server.allow_toolbox"
        self.destination = "Toolbox"
        self.type = PromptResponse.PromptType.TOOLBOX

    async def send_message_if_not_rate_limited(self, text_data):
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        try:
            validated = ToolSchema.model_validate_json(text_data)
            if not self.key_object:
                await self.send(
                    text_data=json.dumps(
                        {
                            "message": "Key is incorrect, disconnected! You need to log in first",
                            "role": "Server",
                            "time": self.time,
                        }
                    )
                )
                await self.disconnect({"code": 3003})
            elif not validated.message.strip():
                await self.send(
                    text_data=json.dumps(
                        {
                            "message": "Empty string recieved",
                            "role": "Server",
                            "time": self.time,
                        }
                    )
                )
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
                unique_response_id = uuid.uuid4().hex
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "role": role,
                        "message": message,
                        "credit": self.key_object.credit,
                        "unique": unique_response_id,
                    },
                )
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "role": tool,
                        "message": message,
                        "credit": self.key_object.credit,
                        "unique": unique_response_id,
                        "emotion_list": validated.emotion_list,
                        "topic_list": validated.topic_list,
                        "style_list": validated.style_list,
                        "number_of_word": validated.number_of_word,
                    },
                )
        except ValidationError as e:
            await self.send(
                text_data=json.dumps(
                    {
                        "message": f"Error: {e.errors()}",
                        "role": "Server",
                        "time": self.time,
                    }
                )
            )

    # Receive message from room group

    async def chat_message(self, event):
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        message = event["message"]
        role = event["role"]
        credit = event["credit"]
        unique_response_id = event["unique"]
        self.time = timezone.localtime(
            timezone.now(), pytz.timezone(self.timezone)
        ).strftime("%Y-%m-%d %H:%M:%S")
        # Send message to WebSocket
        if role == "Human" or role == "Server":
            await self.send(
                text_data=json.dumps(
                    {"message": "\n" + message, "role": role, "time": self.time}
                )
            )
            if role == "Human":
                await self.send(
                    text_data=json.dumps(
                        {
                            "holder": "place_holder",
                            "holderid": unique_response_id,
                            "role": self.choosen_model,
                            "time": self.time,
                            "credit": credit,
                        }
                    )
                )
        else:
            try:
                llm = await self.get_model()
                if llm.is_self_host:
                    url, instance_id, server_status, host_mode = await self.get_model_url_async()
                    split_url = urlsplit(url)
                    await update_server_status_in_db_async(
                        instance_id=instance_id, update_type="time", host_mode=host_mode
                    )
                    if server_status == InferenceServer.StatusType.RUNNING:
                        client = dspy.HFClientVLLM(
                            model=llm.base,
                            port=80,
                            url=split_url.scheme + "://" + split_url.hostname,
                        )
                    else:
                        await self.manage_ec2_on_inference(server_status, instance_id, host_mode)
                    await self.send(
                        text_data=json.dumps(
                            {
                                "message": "There is an unknown bug with dSpy and vLLM, sorry for the inconvenience, this will be implemented in the future",
                                "stream_id": unique_response_id,
                                "credit": credit,
                            }
                        )
                    )
                else:
                    client = dspy.OpenAI(
                        model=self.choosen_model,
                        max_tokens=self.max_tokens,
                        top_p=self.top_p,
                        presence_penalty=self.presence_penalty,
                        frequency_penalty=self.frequency_penalty,
                        temperature=self.temperature,
                        api_key=config("GPT_KEY"),
                    )
                    dspy.configure(lm=client)

                    if role == "summary":
                        number_of_word = event["number_of_word"]
                        if number_of_word is not None and isinstance(
                            number_of_word, int
                        ):
                            Summarizer_ = SummarizeDocument
                            Summarizer_.__doc__ = (
                                f"Compress document in {number_of_word} words."
                            )
                        else:
                            Summarizer_ = SummarizeDocument
                        summarize = dspy.Predict(Summarizer_)
                        response = summarize(document=message)
                        await self.send(
                            text_data=json.dumps(
                                {
                                    "message": response.summary,
                                    "stream_id": unique_response_id,
                                    "credit": credit,
                                }
                            )
                        )

                    elif role == "sentiment":
                        predict = dspy.Predict("document -> sentiment")
                        response = predict(document=message)
                        await self.send(
                            text_data=json.dumps(
                                {
                                    "message": response.sentiment,
                                    "stream_id": unique_response_id,
                                    "credit": credit,
                                }
                            )
                        )
                    elif role == "emotion":
                        emotion_list = event["emotion_list"]
                        if emotion_list is not None:
                            Emotion_ = Emotion
                            Emotion_.__doc__ = (
                                f"""Classify emotion among {emotion_list}."""
                            )
                        else:
                            Emotion_ = Emotion
                        predict = dspy.Predict(Emotion_)
                        response = predict(sentence=message)
                        await self.send(
                            text_data=json.dumps(
                                {
                                    "message": response.emotion,
                                    "stream_id": unique_response_id,
                                    "credit": credit,
                                }
                            )
                        )
                    elif role == "topic":
                        topic_list = event["topic_list"]
                        if topic_list is not None:
                            Topic_ = TopicClassification
                            Topic_.__doc__ = f"""Classify topic among {topic_list}."""
                        else:
                            Topic_ = TopicClassification
                        predict = dspy.Predict(Topic_)
                        response = predict(document=message)
                        await self.send(
                            text_data=json.dumps(
                                {
                                    "message": response.topic,
                                    "stream_id": unique_response_id,
                                    "credit": credit,
                                }
                            )
                        )
                    elif role == "paraphrase":
                        paraphaser = dspy.Predict(ParaphaseDocument)
                        response = paraphaser(document=message)
                        await self.send(
                            text_data=json.dumps(
                                {
                                    "message": response.paraphased,
                                    "stream_id": unique_response_id,
                                    "credit": credit,
                                }
                            )
                        )
                    elif role == "restyle":
                        new_style = event["style_list"]
                        if new_style is not None:
                            Restyler_ = ChangeWrittingStyle
                            Restyler_.__doc__ = (
                                f"""Writing document in {new_style} style."""
                            )
                        else:
                            Restyler_ = ChangeWrittingStyle
                        restyler = dspy.Predict(Restyler_)
                        response = restyler(document=message)
                        await self.send(
                            text_data=json.dumps(
                                {
                                    "message": response.styled,
                                    "stream_id": unique_response_id,
                                    "credit": credit,
                                }
                            )
                        )
                    else:
                        await self.send(
                            text_data=json.dumps(
                                {
                                    "message": message,
                                    "stream_id": unique_response_id,
                                    "credit": credit,
                                }
                            )
                        )

            except Exception as e:
                await self.send(
                    text_data=json.dumps(
                        {"message": f"Error: {e}", "role": "Server", "time": self.time}
                    )
                )
