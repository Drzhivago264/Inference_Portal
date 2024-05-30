The behaviors of this website
=============================

--- 

## 1. Inference Management
- This website dynamically boot up GPU servers on users' demands
- 1200 seconds from the last resonpses, GPU servers are automatically shut down.
- GPU servers are kept running if there is a constant demand.

## 2. Key Management
- Key with 0 credit has 7-day time to live, key with credit does not expire.
- Only the hashed keys are stored in our database, refer to the tables below.
- A dummy User model where username = password = hashkey is used to maintain login session. 

| Key                | Description                                                                          | Example                       |
| ------------------ | :----------------------------------------------------------------------------------- | :---------------------------- |
| user               | reference to User Model where user.username = user.password = hashed(key)            | `pbkdf2_sha256$***`           |
| name               | the name of the key given by user                                                    | `key_1`                       |
| credit             | Amount of credit in USD for the key.                                                 | `0.0`                         |
| monero_credit      | Amount of credit in XMR for the key.                                                 | `0.0`                         |
| created_at         | Datetime when key is created (expired in 7-day only when credit = monero_credit = 0) | `2024-05-12T16:20:00.141838Z` |
| updated_at         | Datetime when key is updated.                                                        | `2024-05-12T16:20:00.141838Z` |
| integrated_address | XMR wallet is automatically generated when key is created                            | `4LHcvZ1EWX1Z***`             |
| payment_id         | XMR payment ID is automatically generated when key is created                        | `bb9***`                      |

## 3. Chat History Management
- User can toggle ```Use Memory``` option in chatroom to query the previous dialogs into the context.
- When ```Use Memory``` is on, all chat messages are embedded and stored in the database.
- Each new prompts is embbeded to calculate the similarity score with those in the database and the dialogs with highest scores are ordered and put in the context of the new prompts.
- When ```Use Memory``` is off, each new prompt are treated as the first conversation.
- Chat History are put in a Tree where the session starting node is referenced to the most similar previous node while the nodes within a session are referenced to the previous one in the session.

| Memory Tree           | Description                                             |
| --------------------- | :------------------------------------------------------ |
| parent                | The older dialog served as parent.                      |
| prompt                | The text content of the prompt.                         |
| response              | The text content of the prompt.                         |
| model                 | The choosen model                                       |
| key                   | Reference to Key model                                  |
| created_at            | Datetime of the dialog                                  |
| p_type                | The type of inference (e.g., open_ai, chatroom, hotpot) |
| is_session_start_node | The mark of the chat session                            |

- The prompt and response are concatenated and/or trimmed to be embbeded and further store in vector database