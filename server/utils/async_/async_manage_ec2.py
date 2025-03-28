import json
from typing import Literal

from constance import config as constant
from django.utils import timezone

from server.models.llm_server import InferenceServer
from server.queue.ec2_manage import command_EC2
from server.utils.async_.async_cache import get_or_set_cache


async def update_server_status_in_db_async(
    instance_id: str, update_type: Literal["status", "time"], host_mode: str
) -> None:
    options = ["status", "time"]
    assert update_type in options, f"'{update_type}' is not in {options}"

    server_object = await InferenceServer.objects.aget(name=instance_id)
    if update_type == "status" and host_mode == InferenceServer.HostModeType.AWS:
        server_object.status = InferenceServer.StatusType.PENDING
    elif update_type == "time":
        server_object.last_message_time = timezone.now()

    await server_object.asave()


class ManageEC2Mixin:
    async def manage_ec2_on_inference(
        self, server_status: str, instance_id: str, host_mode: str
    ) -> None:
        if server_status in [InferenceServer.StatusType.STOPPED, server_status == InferenceServer.StatusType.STOPPING] and host_mode == InferenceServer.HostModeType.AWS:
            command_EC2.delay(instance_id, region=constant.REGION, action="on")
            response = "Server is starting up, try again in 400 seconds"
        elif server_status == InferenceServer.StatusType.PENDING and host_mode == InferenceServer.HostModeType.AWS:
            response = "Server is setting up, try again in 30 seconds"
        elif server_status in [InferenceServer.StatusType.STOPPED,
                InferenceServer.StatusType.STOPPING,
                InferenceServer.StatusType.PENDING] and host_mode == InferenceServer.HostModeType.LOCAL:
                response = "Local server is down"
        else:
            response = "Unknown Server state, wait 5 seconds"

        await update_server_status_in_db_async(
            instance_id=instance_id, update_type="status", host_mode=host_mode
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
