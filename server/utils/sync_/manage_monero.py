from typing import Optional

import requests


def manage_monero(command: str, params: Optional[dict] = None) -> requests.Response:
    """
    Sends a JSON-RPC request to a Monero daemon.

    Args:
        command (str): The RPC method to be called.
        params (dict, optional): Optional parameters for the RPC method. Defaults to None.

    Returns:
        requests.Response: The response object from the POST request.
    """
    rpc_input = {"method": command, "jsonrpc": "2.0", "id": "0"}
    if params is not None:
        rpc_input["params"] = params
    response = requests.post(
        "http://127.0.0.1:18082/json_rpc",
        json=rpc_input,
        headers={"content-type": "application/json"},
    )
    return response
