import json

from django.utils import timezone

from server.queue.ec2_manage import command_EC2
from server.models import InferenceServer
from server.utils.constant import REGION


async def update_server_status_in_db_async(instance_id: str, update_type: str) -> None:
    ser_obj = await InferenceServer.objects.aget(name=instance_id)
    if update_type == "status":
        ser_obj.status = "pending"
        await ser_obj.asave()
    elif update_type == "time":
        ser_obj.last_message_time = timezone.now()
        await ser_obj.asave()


class ManageEC2Mixin:
    async def manage_ec2_on_inference(
        self, server_status: str, instance_id: str
    ) -> None:
        if server_status == "stopped" or "stopping":
            command_EC2.delay(instance_id, region=REGION, action="on")
            response = "Server is starting up, try again in 400 seconds"
            await update_server_status_in_db_async(
                instance_id=instance_id, update_type="status"
            )
            await self.send(
                text_data=json.dumps(
                    {
                        "message": response,
                        "stream_id": self.unique_response_id,
                        "credit": self.key_object.credit,
                    }
                )
            )
        elif server_status == "pending":
            response = "Server is setting up, try again in 30 seconds"
            await self.send(
                text_data=json.dumps(
                    {
                        "message": response,
                        "stream_id": self.unique_response_id,
                        "credit": self.key_object.credit,
                    }
                )
            )
        else:
            response = "Unknown Server state, wait 5 seconds"
            await self.send(
                text_data=json.dumps(
                    {
                        "message": response,
                        "stream_id": self.unique_response_id,
                        "credit": self.key_object.credit,
                    }
                )
            )
