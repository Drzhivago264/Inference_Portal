from transformers import AutoTokenizer
SERVER_TTL = 1200
MONITOR_ITERVAL = 5
SHUTDOWN_INTERVAL = 60
REGION =  "us-east-1"
MODEL_TEMPLATE_TABLE = {"Mistral Chat 13B": "Below is an instruction that describes a task. Write a response that appropriately completes the request.\n\n### Instruction:\n{}\n\n### Response:\n", 
                        "Llama 2  Chat 13B": "[INST] <<SYS>>\nYou are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.\n<</SYS>>{}[/INST]", 
                        "4Chan /Pol 2.7B": "<post> {} <comment> ", 
                        "Reddit Helper 2.7B": "<post> {} <comment> "}

SHORTEN_TEMPLATE_TABLE = {"Mistral Chat 13B": "### Instruction:\n{}\n\n### Response:\n{}\n", 
                        "Llama 2  Chat 13B": "{}[/INST] {}</s>", 
                        "4Chan /Pol 2.7B": "<post> {} <comment> {}", 
                        "Reddit Helper 2.7B": "<post> {} <comment> {}"}

SHORTEN_INSTRUCT_TABLE = {"Mistral Chat 13B": "Below is an instruction that describes a task. Write a response that appropriately completes the request.\n\n", 
                        "Llama 2  Chat 13B": "[INST] <<SYS>>\nYou are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information. \n<</SYS>>", 
                        "4Chan /Pol 2.7B": "", 
                        "Reddit Helper 2.7B": ""}

TOKENIZER_TABLE = {
    "Mistral Chat 13B": AutoTokenizer.from_pretrained("TheBloke/Amethyst-13B-Mistral-AWQ"),
    "Llama 2  Chat 13B": AutoTokenizer.from_pretrained("TheBloke/Llama-2-13B-chat-AWQ"),
    "4Chan /Pol 2.7B": AutoTokenizer.from_pretrained("EleutherAI/gpt-neo-2.7B"),
    "Reddit Helper 2.7B": AutoTokenizer.from_pretrained("EleutherAI/gpt-neo-2.7B")
}


MAX_HISTORY_LENGTH = {
    "Mistral Chat 13B": 3000,
    "Llama 2  Chat 13B": 3000,
    "4Chan /Pol 2.7B": 100,
    "Reddit Helper 2.7B": 100
}
DEFAULT_TOP_P =  0.73
DEFAULT_BEST_OF =  1
DEFAULT_TOP_K =  -1
DEFAULT_MAX_TOKENS =  128
DEFAULT_FREQUENCY_PENALTY =  0
DEFAULT_PRESENCE_PENALTY =  0
DEFAULT_TEMPERATURE =  0.73
DEFAULT_BEAM =  False
DEFAULT_EARLY_STOPPING =  False
DEFAULT_LENGTH_PENALTY =  0
DEFAULT_MODEL = "Mistral Chat 13B"
DEFAULT_MODE = "generate"
DEFAULT_N = 1

CACHE_AUTHENTICATION = 10
CACHE_SERVER_LINK_RETRIVAL = 60

DEFAULT_CHAT_HISTORY_OBJECT = 5
DEFAULT_CHAT_HISTORY_VECTOR_OBJECT = 5


