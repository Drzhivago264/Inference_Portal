from rest_framework.throttling import AnonRateThrottle

class KeyCreateRateThrottle(AnonRateThrottle):
    scope = 'create_key'

class CreditCheckRateThrottle(AnonRateThrottle):
    scope = 'check_key'

class XMRConfirmationRateThrottle(AnonRateThrottle):
    scope = "confirm_monero"