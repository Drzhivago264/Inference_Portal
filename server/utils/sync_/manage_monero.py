import requests

def manage_monero(command, params=None):
    rpc_input = {
        "method": command
    }
    if params is not None:
        rpc_input.update({'params': params})
    rpc_input.update({"jsonrpc": "2.0", "id": "0"})
    response = requests.post("http://127.0.0.1:18082/json_rpc",
                             json=rpc_input, headers={"content-type": "application/json"})
    return response
