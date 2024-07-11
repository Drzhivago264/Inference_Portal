SERVER_TTL = 1200
MONITOR_ITERVAL = 5
SHUTDOWN_INTERVAL = 60
XMR_PRICE_INTERVAL = 600
DELETE_KEY_INTERVAL = 86400
KEY_TTL = 7  # day
MAX_PARENT_TEMPLATE_PER_USER = 10  # 10 Parent templates x 3 Child templates
MAX_CHILD_TEMPLATE_PER_USER = 3
DEFAULT_SELF_HOST = "Llama 3 Instruct AWQ"
TIMEOUT = 10.0
RETRY = 0
REGION = "us-east-1"
SYSTEM_INSTRUCT_TABLE = {"Mistral Chat 13B": "Below is an instruction that describes a task. Write a response that appropriately completes the request.",
                          "Llama 2  Chat 13B": "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
                          "4Chan /Pol 2.7B": "",
                          "Reddit Helper 2.7B": "",
                          "Llama 3 Instruct AWQ": "You are a helpful AI assistant that needs to answer people questions"}



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
DEFAULT_MAX_INPUT_LENGTH =  128000
CACHE_AUTHENTICATION = 10
CACHE_SERVER_LINK_RETRIVAL = 60
DEFAULT_CHAT_HISTORY_OBJECT = 3
DEFAULT_CHAT_HISTORY_VECTOR_OBJECT = 10
DEFAULT_MAX_DISTANCE = 1 #for vector search (ranging from 0 to 2 for cosin similarity)
DEFAULT_AGENT_TURN = 4
