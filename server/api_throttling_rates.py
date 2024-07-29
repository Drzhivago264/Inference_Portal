from rest_framework.throttling import AnonRateThrottle, UserRateThrottle


class KeyCreateRateThrottle(AnonRateThrottle):
    scope = "create_key"


class CreditCheckRateThrottle(AnonRateThrottle):
    scope = "check_key"


class XMRConfirmationRateThrottle(AnonRateThrottle):
    scope = "confirm_monero"


class DatasetExportRateThrottle(UserRateThrottle):
    scope = "dataset_export"