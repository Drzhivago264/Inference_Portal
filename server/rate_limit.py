from datetime import datetime
from zoneinfo import ZoneInfo

from django.conf import settings
from limits import parse_many
from limits.aio.strategies import (
    FixedWindowElasticExpiryRateLimiter,
    FixedWindowRateLimiter,
    MovingWindowRateLimiter,
)

from server.models.api_key import APIKEY, FineGrainAPIKEY


class RateLimitError(Exception):
    def __init__(self, message=None):
        self.message = message
        super().__init__(message)


class RateLimiter:
    def __init__(
        self,
        strategy: str,
        rate: str,
        namespace: str,
        unique: str,
        time_zone: str | None,
    ):
        self.rate = parse_many(rate)
        self.storage = settings.RATE_LIMIT_STORAGE
        strategy_dispatch = {
            "moving_windown": MovingWindowRateLimiter,
            "fixed_windown": FixedWindowRateLimiter,
            "fixed_elastic_windown": FixedWindowElasticExpiryRateLimiter,
        }
        self.strategy = strategy_dispatch[strategy](storage=self.storage)
        self.namespace = namespace
        self.unique = unique
        self.time_zone = time_zone

    async def check_rate_limit(self, cost: int = 1):
        for rate in self.rate:
            not_limited = await self.strategy.test(
                rate, *[self.namespace, self.unique], cost
            )
            if not not_limited:
                if self.time_zone:
                    reset_time, _ = await self.strategy.get_window_stats(
                        rate, *[self.namespace, self.unique]
                    )
                    raise RateLimitError(
                        f"Ratelimit: ({rate}) exceeded! Available at {datetime.fromtimestamp(reset_time, ZoneInfo(self.time_zone)).strftime('%H:%M:%S')}"
                    )
                else:
                    raise RateLimitError(f"Ratelimit: ({rate}) exceeded!")
            if not_limited:
                await self.strategy.hit(rate, *[self.namespace, self.unique], cost)


async def rate_limit_initializer(
    key_object: APIKEY,
    slave_key_object: FineGrainAPIKEY | None,
    namespace: str,
    timezone: str | None,
    strategy: str,
) -> RateLimiter:
    """
    Initializes and returns a RateLimiter object based on the provided API key objects, namespace, timezone, and strategy.

    Args:
        key_object (APIKEY): An instance of APIKEY containing rate limit information.
        slave_key_object (FineGrainAPIKEY | None): An optional instance of FineGrainAPIKEY with additional rate limit information.
        namespace (str): A string representing the namespace for the rate limiter.
        timezone (str | None): An optional string representing the timezone.
        strategy (str): A string representing the rate limiting strategy.

    Returns:
        RateLimiter: A RateLimiter object configured with the provided parameters.
    """
    rate = (
        f"{key_object.ratelimit};{slave_key_object.ratelimit}"
        if slave_key_object
        else key_object.ratelimit
    )
    unique_key = key_object.hashed_key if not slave_key_object else slave_key_object
    rate_limiter = RateLimiter(
        rate=rate,
        strategy=strategy,
        namespace=namespace,
        unique=unique_key,
        time_zone=timezone,
    )
    return rate_limiter
