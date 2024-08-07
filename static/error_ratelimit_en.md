Common Errors and Ratelimits
=======================

---

##  Common Errors

The server responds to a user’s request by issuing status codes when the request is made to the server. Kindly refer to the table below to further understand the status codes when indicating the success or failure of an API call.

| Status Codes                | Description                                                                                                                                                                                          |
| --------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 400 (Bad Request)           | This is due to an invalid request and the server could not process the user's request                                                                                                                |
| 401 (Unauthorized)          | This is due to the lack of valid authentication credentials for the requested resource by the user                                                                                                   |
| 403 (Forbidden)             | This is likely indicating that your access is blocked by our server, and we're unable to authorize your request                                                                                      |
| 429 (Too many requests)     | This is likely indicating that the rate limit has reached. The user should reduce the number of calls made, or consider scaling their service plan that has much higher rate limits and call credits |
| 500 (Internal Server Error) | This is a generic error response indicating that the server has encountered an unexpected issue that prevented it from fulfilling the request                                                        |
| 503 (Service Unavailable)   | The service is currently unavailable.                                                                                                                                                                |


---

##  Ratelimits

There are multiple ratelimits applied for different endpoints


###  Frontend endpoints

>Frontend endpoints are intended to be used via web browser. However, if you insist, you can supply the cookie taken from your browser to programmatically generate and manage your Key(s).

| Endpoint                          | Description                                                           | Ratelimit |
| --------------------------------- | :-------------------------------------------------------------------- | :-------- |
| /frontend-api/model/              | Retrieve information for the hosted models and pricing                | 20/s      |
| /frontend-api/generate-key        | Generate a new API Key                                                | 100/day   |
| /frontend-api/check-credit        | Check the credit of an API Key                                        | 100/hour  |
| /frontend-api/get-xmr-wallet      | Retrieve information for your XMR integrated wallet with each API Key | 100/day   |
| /frontend-api/confirm-xmr-payment | Confirm payment sent to the your XMR integrated wallet                | 100/day   |
| /frontend-api/send-mail           | Contact us email                                                      | 1/day     |

###  Inference endpoints


| Endpoint               | Description                                                 | Ratelimit |
| ---------------------- | :---------------------------------------------------------- | :-------- |
| /api/completion        | Complete a given sentence                                   | 5/s       |
| /api/chat              | Answer a given sentence                                     | 5/s       |
| /api/predict/sentiment | Predict sentiment of a given sentence                       | 5/s       |
| /api/predict/emotion   | Predict emotion of a given sentence from a list of emotions | 5/s       |
| /api/predict/paraphase | Paraphase a given sentence                                  | 5/s       |
| /api/tasks/summarize   | Summarise a given sentence                                  | 5/s       |
| /api/tasks/classify    | Classify a given sentence with a list of categories         | 5/s       |
| /api/tasks/restyle     | Restyle a given sentence according to a list of style       | 5/s       |
| /api/responselog       | Retrieve log                                                | 10/m      |
