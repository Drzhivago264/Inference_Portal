from django.conf import settings
from limits import parse_many
from limits.aio.strategies import MovingWindowRateLimiter, FixedWindowRateLimiter, FixedWindowElasticExpiryRateLimiter
from zoneinfo import ZoneInfo
from datetime import datetime
from server.models import APIKEY, FineGrainAPIKEY

class RateLimitError(Exception):
    def __init__(self, message=None):
        self.message = message
        super().__init__(message)
class RateLimiter:
    def __init__(self, strategy: str, rate: str, namespace: str, unique: str, time_zone: str | None):
        self.rate = parse_many(rate)
        self.storage = settings.RATE_LIMIT_STORAGE
        strategy_dispatch = {
            "moving_windown": MovingWindowRateLimiter,
            "fixed_windown": FixedWindowRateLimiter,
            "fixed_elastic_windown": FixedWindowElasticExpiryRateLimiter
        }
        self.strategy = strategy_dispatch[strategy](storage=self.storage) 
        self.namespace = namespace
        self.unique = unique
        self.time_zone = time_zone 

    async def check_rate_limit(self, cost: int = 1):
        for rate in self.rate:
            not_limited = await self.strategy.test(rate, *[self.namespace, self.unique], cost)
            if not not_limited:
                if self.time_zone:
                    reset_time, _ = await self.strategy.get_window_stats(rate, *[self.namespace, self.unique])
                    raise RateLimitError(f"Ratelimit: ({rate}) exceeded! Available at {datetime.fromtimestamp(reset_time, ZoneInfo(self.time_zone)).strftime('%H:%M:%S')}")    
                else:
                    raise RateLimitError(f"Ratelimit: ({rate}) exceeded!")    
            if not_limited:
                await self.strategy.hit(rate, *[self.namespace, self.unique], cost)

async def rate_limit_initializer(key_object: APIKEY, slave_key_object: FineGrainAPIKEY | None, namespace: str, timezone: str | None, strategy: str) -> RateLimiter:
    rate = f"{key_object.ratelimit};{slave_key_object.ratelimit}" if slave_key_object is not None else key_object.ratelimit
    rate_limiter = RateLimiter(rate=rate, strategy=strategy, namespace=namespace, unique=key_object.hashed_key if slave_key_object is None else slave_key_object, time_zone=timezone)
    return rate_limiter
     