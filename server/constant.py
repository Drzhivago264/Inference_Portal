# User Constants
DEFAULT_PERMISSION_CODENAMES = [
    "allow_chat",
    "allow_agent",
    "allow_toolbox",
    "allow_view_log",
    "allow_chat_api",
    "allow_agent_api",
    "allow_toolbox_api",
    "allow_view_cost",
    "allow_data_synthesis",
    "allow_create_token",
    "add_userinstructiontree",
    "change_userinstructiontree",
    "delete_userinstructiontree",
    "view_userinstructiontree",
    "add_dataset",
    "change_dataset",
    "delete_dataset",
    "view_dataset",
    "add_datasetrecord",
    "change_datasetrecord",
    "delete_datasetrecord",
    "view_datasetrecord",
]
MAX_KEY_NAME_LENGTH = 50
MAX_DATASET_PER_USER = 20
MAX_EVALUATION_PER_RECORD = 20
MAX_ROW_NUMBER_FOR_DIRECT_EXPORT = 10000  # if the number of row in the db higher than this number then celery task will be scheduled to export the dataset.
MAX_PARENT_TEMPLATE_PER_USER = 25  # 25 Parent templates x 10 Child templates
MAX_CHILD_TEMPLATE_PER_USER = 10
MAX_TOKEN_PER_USER = 10
DELETE_KEY_INTERVAL = 86400
KEY_TTL = 7  # day

# GPU Server constant
SERVER_TTL = 1200
MONITOR_ITERVAL = 5
SHUTDOWN_INTERVAL = 60
XMR_PRICE_INTERVAL = 600
TIMEOUT = 10.0
RETRY = 0
REGION = "us-east-1"
CACHE_SERVER_LINK_RETRIVAL = 60

# Inference Constant
DEFAULT_SELF_HOST = "Llama 3 Instruct AWQ"
OPEN_AI_MODEL_LIST = [
    "gpt-4",
    "gpt-3.5-turbo-0125",
    "gpt-4-0125-preview",
]
DEFAULT_TOP_P = 0.73
DEFAULT_BEST_OF = 1
DEFAULT_TOP_K = -1
DEFAULT_MAX_TOKENS = 128
DEFAULT_FREQUENCY_PENALTY = 0
DEFAULT_PRESENCE_PENALTY = 0
DEFAULT_TEMPERATURE = 0.73
DEFAULT_BEAM = False
DEFAULT_EARLY_STOPPING = False
DEFAULT_LENGTH_PENALTY = 0
DEFAULT_MODE = "generate"
DEFAULT_N = 1
DEFAULT_MEMORY = True
DEFAULT_MAX_INPUT_LENGTH = 128000
DEFAULT_CHAT_HISTORY_VECTOR_OBJECT = 10

# for vector search (ranging from 0 to 2 for cosin similarity)
DEFAULT_MAX_DISTANCE = 1
DEFAULT_AGENT_TURN = 4
