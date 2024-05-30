### Chat Bot Mode

This mode formats users' prompt into chat template of the choosen model and query the chat history in vectordb to produce, hopefully, better responses.

&nbsp; 

---

### Agent Mode

An implementation of React agent that is capable of reasoning and acting in multiple prompt-response loops (default is 4). Agents are tasked with predetermined templates (e.g., writing assignment, writing advertisement materials, or protecting cat). Users can design their own template for their agents. After the prompt-response loop is finished, the agent outputs the final result into a text editor for further edit. 

&nbsp; 

--- 

### Hotpot Mode

This mode puts agent and chatbot into 1 page for testing purposes.

&nbsp; 

---

### LLM functions

This mode displays the backend functions that are used for multiple tasks (e.g., classification, sentiment predictions).  The backend functions are used in both chatbot and agent modes to improve the context of users' prompts.