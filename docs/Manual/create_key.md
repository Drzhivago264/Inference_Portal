Setting Up Your API Key
=======================

## 1. Creating a new API Key

> - The ratelimit for key creation is 20 key per IP address per day.
> - Unused Keys with no credit are expired in 30 days. 

- Navigate to [Key & Credit](https://professorparakeet.com/frontend/key-management) tab on Appbar
- Fill and submit the Create a Key form. 
- Export key file and keep it secure.

## 2. Make API request

- Visit [API Docs](https://professorparakeet.com/api/docs) to test out the APIs
- The root URL for the Professor Parakeet API is https://professorparakeet.com/api/
- Feel free to experiment with available endpoints in the documentation by entering your API Key in the Authorize section and clicking the `Authorize` button

## 3. Edit or Delete API Key

- In case the API Key is compromised, you may delete the API Key by clicking the "Delete Key" button
- You may also update the label and save the changes by clicking "Confirm" button

## 4. API Usage Report

- For now you can review your previous prompt-response log with api/responselog endpoint where the cost of each API call is specified.
- Complete usage report is a future feature.