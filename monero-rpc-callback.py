import sys
import requests
import logging
def call_XMR_webhook_endpoint(monero_webhook_secret: str, tx_id: str):
    """
    This function will be called by Monero RPC whenever new transaction received.

    It will be called with this:
    aa--tx-notify '/{path_to}/python3 /{path_to}/Inference_Portal/monero-rpc-callback.py {monero webhook secret} %s'

    Args:
        monero_webhook_secret (str): webhook secret specified in .env
        tx_id (str): The transaction hash
    """
    if tx_id and monero_webhook_secret:
        response = requests.post(
            "http://127.0.0.1:8000/webhooks/xmr/",
            json={
                "tx_id": tx_id,
                "monero_webhook_secret": monero_webhook_secret
            },
        )
        logging.info(response.json())



call_XMR_webhook_endpoint(sys.argv[1], sys.argv[2])