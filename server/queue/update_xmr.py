import json
import requests
from celery import shared_task
from decouple import config
from server.models import Crypto
@shared_task()
def update_crypto_rate(coin: str):
    """
    Update the USD rate for a specific cryptocurrency.

    Parameters:
    - coin (str): The abbreviation of the cryptocurrency to update.

    Raises:
    - KeyError: If the required data for updating the rate is not found in the API responses.

    Notes:
    - This task fetches the current USD rate for the specified cryptocurrency from external APIs and updates the rate in the database.
    """
    if coin == "xmr":
        try:
            url = "https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd"
            response = requests.get(url)
            price = float(json.loads(response.text)["monero"]["usd"])
            crypto = Crypto.objects.get(coin=coin)
            crypto.coin_usd_rate = price
            crypto.save()
        except KeyError:
            try:
                url = (
                    "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest"
                )
                headers = {
                    "Accepts": "application/json",
                    "X-CMC_PRO_API_KEY": config("CMC_API"),
                }
                params = {
                    "id": "328",
                    "convert": "USD",
                }
                response = requests.get(url, headers=headers, params=params)
                price = json.loads(response.text)["data"]["328"]["quote"]["USD"][
                    "price"
                ]
                crypto = Crypto.objects.get(coin=coin)
                crypto.coin_usd_rate = price
                crypto.save()
            except KeyError:
                pass


