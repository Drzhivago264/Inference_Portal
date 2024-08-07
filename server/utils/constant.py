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
SERVER_TTL = 1200
MONITOR_ITERVAL = 5
SHUTDOWN_INTERVAL = 60
XMR_PRICE_INTERVAL = 600
DELETE_KEY_INTERVAL = 86400
KEY_TTL = 7  # day
MAX_PARENT_TEMPLATE_PER_USER = 25  # 25 Parent templates x 10 Child templates
MAX_CHILD_TEMPLATE_PER_USER = 10
MAX_TOKEN_PER_USER = 10
DEFAULT_SELF_HOST = "Llama 3 Instruct AWQ"
TIMEOUT = 10.0
RETRY = 0
REGION = "us-east-1"
SYSTEM_INSTRUCT_TABLE = {
    "Mistral Chat 13B": "Below is an instruction that describes a task. Write a response that appropriately completes the request.",
    "Llama 2  Chat 13B": "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
    "4Chan /Pol 2.7B": "",
    "Reddit Helper 2.7B": "",
    "Llama 3 Instruct AWQ": "You are a helpful AI assistant that needs to answer people questions",
}

OPEN_AI_MODEL_LIST = [
    "gpt-4",
    "gpt-3.5-turbo-0125",
    "gpt-3.5-turbo-instruct",
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
CACHE_AUTHENTICATION = 10
CACHE_SERVER_LINK_RETRIVAL = 60
DEFAULT_CHAT_HISTORY_OBJECT = 3
DEFAULT_CHAT_HISTORY_VECTOR_OBJECT = 10
# for vector search (ranging from 0 to 2 for cosin similarity)
DEFAULT_MAX_DISTANCE = 1
DEFAULT_AGENT_TURN = 4
