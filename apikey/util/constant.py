SERVER_TTL = 1200
MONITOR_ITERVAL = 5
SHUTDOWN_INTERVAL = 60
REGION =  "us-east-1"
MODEL_TEMPLATE_TABLE = {"Mistral Chat 13B": "Below is an instruction that describes a task. Write a response that appropriately completes the request.\n\n### Instruction:\n{}\n\n### Response:\n", 
                        "Llama 2 Chat 13B": "[INST] <<SYS>>\nYou are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe.  Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.\n<</SYS>>{}[/INST]", 
                        "4Chan /Pol 2.7B": "<post> {} <comment> ", 
                        "Reddit Helper 2.7B": "<post> {} <comment> "}