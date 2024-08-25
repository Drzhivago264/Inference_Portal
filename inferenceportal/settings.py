"""
Django settings for inferenceportal project.

Generated by 'django-admin startproject' using Django 5.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path

from decouple import config
from limits.storage import storage_from_string

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    "professorparakeet.com",
    "www.professorparakeet.com",
    "static.professorparakeet.com",
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8000",
    "https://professorparakeet.com",
    "https://www.professorparakeet.com",
]

# Application definition

INSTALLED_APPS = [
    "daphne",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "constance",
    "rest_framework",
    "corsheaders",
    "server",
    "rest_framework_api_key",
    "vectordb",
    "ninja",
    "treebeard",
]
CORS_ORIGIN_ALLOW_ALL = True
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6380)],
            "capacity": 1500,  # default 100
            "expiry": 10,  # default 60
        },
    },
}

DJANGO_VECTOR_DB = {
    "DEFAULT_EMBEDDING_CLASS": "vectordb.embedding_functions.SentenceTransformerEncoder",
    "DEFAULT_EMBEDDING_MODEL": "Snowflake/snowflake-arctic-embed-xs",
    "DEFAULT_EMBEDDING_SPACE": "l2",  # Can be "cosine" or "l2"
    "DEFAULT_EMBEDDING_DIMENSION": 384,  # Default is 384 for "all-MiniLM-L6-v2"
    # Number of results to return from search maximum is default is 10
    "DEFAULT_MAX_N_RESULTS": 10,
    "DEFAULT_MIN_SCORE": 0.0,  # Minimum score to return from search default is 0.0
    # Maximum number of items to search using brute force default is 10_000. If the number of items is greater than this number, the search will be done using the HNSW index.
    "DEFAULT_MAX_BRUTEFORCE_N": 10_000,
}

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
SESSION_ENGINE = "django.contrib.sessions.backends.cached_db"
ROOT_URLCONF = "inferenceportal.urls"
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            "frontend/templates",
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": "redis://127.0.0.1:6380",
    }
}

RATE_LIMIT_STORAGE = storage_from_string("async+redis://localhost:6380")

ASGI_APPLICATION = "inferenceportal.asgi.application"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"
# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "professorparakeet",
        "USER": config("POSTGRES_USER"),
        "PASSWORD": config("POSTGRES_PASSWORD"),
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}
# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True


if DEBUG:
    STATIC_URL = "static/"  # Don't break local dev
else:
    STATIC_URL = "https://static.professorparakeet.com/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = config("EMAIL_ADDRESS")
EMAIL_HOST_PASSWORD = config("EMAIL_PASSWORD")

STATIC_ROOT = "staticfiles"

CELERY_BROKER_URL = "redis://127.0.0.1:6380"

REST_FRAMEWORK = {
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
        "server.api_throttling_rates.KeyCreateRateThrottle",
        "server.api_throttling_rates.CreditCheckRateThrottle",
        "server.api_throttling_rates.XMRConfirmationRateThrottle",
        "server.api_throttling_rates.DatasetExportRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "10/s",
        "user": "20/s",
        "create_key": "50/day",
        "check_key": "100/hour",
        "confirm_monero": "100/hour",
        "dataset_export": "10/hour",
    },
}
DATA_UPLOAD_MAX_MEMORY_SIZE = None
CONSTANCE_REDIS_CONNECTION = "redis://127.0.0.1:6380"
CONSTANCE_IGNORE_ADMIN_VERSION_CHECK = True
CONSTANCE_CONFIG = {
    "STRIPE_BACKEND_DOMAIN": (
        "http://127.0.0.1:8000",
        "Backend domain for Stripe",
        str,
    ),
    "STRIPE_PAYMENT_SUCCESS_URL": (
        "https://professorparakeet.com/frontend/payment-success/",
        "The URL to redirect users when payment success",
        str,
    ),
    "STRIPE_PAYMENT_FAILURE_URL": (
        "https://professorparakeet.com/",
        "The URL to redirect users when payment failed",
        str,
    ),
    "MAX_KEY_NAME_LENGTH": (50, "The maximum length of the name for API key", int),
    "MAX_DATASET_PER_USER": (20, "The maximum number of dataset per a user", int),
    "MAX_EVALUATION_PER_RECORD": (20, "The evaluation per dataset", int),
    "MAX_ROW_NUMBER_FOR_DIRECT_EXPORT": (
        10000,
        "if the number of row in the db higher than this number then celery task will be scheduled to export the dataset.",
        int,
    ),
    "MAX_PARENT_TEMPLATE_PER_USER": (
        25,
        "25 Parent templates x 10 Child templates per users",
        int,
    ),
    "MAX_CHILD_TEMPLATE_PER_USER": (
        10,
        "25 Parent templates x 10 Child templates per users",
        int,
    ),
    "MAX_TOKEN_PER_USER": (20, "The maximum number of token generated by a user", int),
    "DELETE_KEY_INTERVAL": (
        86400,
        "Every day a celery task is scheduled to scan and delete expired key",
        int,
    ),
    "VALIDATE_XMR_PAYMENT": (
        1800,
        "Every 30 minutes a celery task is scheduled to scan and validate pending XMR payment",
        int,
    ),
    "KEY_TTL": (
        7,
        "if a API Key does not have any credit and exist longer than a week, then celery task will be scheduled to delete the key.",
        int,
    ),
    "SERVER_TTL": (
        1200,
        "After 1200 second without any usage, vLLM is shut down.",
        int,
    ),
    "MONITOR_ITERVAL": (5, "Update vLLM status every 5 seconds", int),
    "SHUTDOWN_INTERVAL": (
        60,
        "Interval for shuting down vLLM server, only applied if TTL (1200) reached",
        int,
    ),
    "XMR_PRICE_INTERVAL": (600, "Interval for updating XMR prices", int),
    "TIMEOUT": (120, "The default timeput of for vLLM request", int),
    "RETRY": (0, "The default retry for inference", int),
    "REGION": ("us-east-1", "The region of vLLM server", str),
    "CACHE_SERVER_LINK_RETRIVAL": (
        50,
        "The length for a vLLM server link to be cached in Redis",
        int,
    ),
    "DEFAULT_SELF_HOST": ("Llama 3 Instruct AWQ", "The default model for vLLM", str),
    "DEFAULT_TOP_P": (0.73, "The default top_p for inference", float),
    "DEFAULT_BEST_OF": (1, "The default best of for vLLM server", int),
    "DEFAULT_TOP_K": (-1, "The default top_k for vLLM server", int),
    "DEFAULT_MAX_TOKENS": (128, "The maximum number of token in the inference", int),
    "DEFAULT_FREQUENCY_PENALTY": (
        0.0,
        "The default presence penalty for inference",
        float,
    ),
    "DEFAULT_PRESENCE_PENALTY": (
        0.0,
        "The default presence penalty for inference",
        float,
    ),
    "DEFAULT_TEMPERATURE": (0.73, "The default temperature for inference", float),
    "DEFAULT_BEAM": (False, "Whether use early stopping in inference or not", bool),
    "DEFAULT_EARLY_STOPPING": (
        False,
        "Whether use early stopping in inference or not",
        bool,
    ),
    "DEFAULT_LENGTH_PENALTY": (0.0, "The default length penalty for inference", float),
    "DEFAULT_MODE": (
        "generate",
        "The default mode of inference (chatbot inference)",
        str,
    ),
    "DEFAULT_N": (1, "The number of inference results request from vLLM server", int),
    "DEFAULT_MEMORY": (
        True,
        "Whether use vector search to retrieve memory or not",
        bool,
    ),
    "DEFAULT_MAX_INPUT_LENGTH": (
        128000,
        "The maximun number of input length in chat message for inference",
        int,
    ),
    "DEFAULT_CHAT_HISTORY_VECTOR_OBJECT": (
        10,
        "The maxium number of chat pairs returned by vector search",
        int,
    ),
    "DEFAULT_MAX_DISTANCE": (
        1,
        "Default Max distance for vector search (ranging from 0 to 2 for cosin similarity)",
        int,
    ),
    "DEFAULT_AGENT_TURN": (
        4,
        "Default prompt-response turn of the agent implemntation",
        int,
    ),
    "DEFAULT_PERMISSION_CODENAMES": (
        "allow_chat allow_agent allow_toolbox allow_view_log allow_chat_api allow_agent_api allow_toolbox_api allow_view_cost allow_data_synthesis allow_create_token add_userinstructiontree change_userinstructiontree delete_userinstructiontree view_userinstructiontree add_dataset change_dataset delete_dataset view_dataset add_datasetrecord change_datasetrecord delete_datasetrecord view_datasetrecord",
        "Default permissions for master users",
        str,
    ),
    "OPEN_AI_MODEL_LIST": (
        "gpt-4 gpt-3.5-turbo-0125 gpt-4-0125-preview",
        "The list of open ai model",
        str,
    ),
}
CONSTANCE_BACKEND = "constance.backends.redisd.CachingRedisBackend"
CONSTANCE_REDIS_CACHE_TIMEOUT = 60

# Stripe
STRIPE_PUBLISHABLE_KEY = config("STRIPE_PUBLISHABLE_KEY")
STRIPE_SECRET_KEY = config("STRIPE_SECRET_KEY")
BACKEND_DOMAIN = CONSTANCE_CONFIG["STRIPE_BACKEND_DOMAIN"][0]
PAYMENT_SUCCESS_URL = CONSTANCE_CONFIG["STRIPE_PAYMENT_SUCCESS_URL"][0]
PAYMENT_CANCEL_URL = CONSTANCE_CONFIG["STRIPE_PAYMENT_FAILURE_URL"][0]
STRIPE_WEBHOOK_SECRET = config("STRIPE_WEBHOOK_SECRET")
