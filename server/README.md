 # t-chain-payment-js-example
 
### Run locally

```bash
$ git clone https://github.com/tokoinofficial/t-chain-payment-js-example.git
$ cd t-chain-payment-js-example/server
```

#### install dependencies
```
$ yarn 
```

#### Run
```
$ yarn dev
```

## Notes 

This is a sample of the merchant backend. In this backend, have 2 endpoints
- `/api/web-hook-url` : this is a webhook provided for t-chain 
    ```
	Data structure sent to hook
	{
		"tnx_hash": string,
		"deposit_address": string,
		"deposit_id": string,
		"merchant_id": string,
		"order_id": string,
		"amount": string,
		"type": int, // Deposit  = 1, Withdraw = 2
		"status": int, // Pending = 1, Success = 2
		"deposited_at": int // unix timestamps in seconds
	}
	```

- `/api/transactions` : this is an endpoint that will show all transactions

### Configure push notification

Get service account credentials for your Firebase project as in this guide:

https://developers.google.com/identity/protocols/oauth2/service-account#creatinganaccount

![Create service account key](https://user-images.githubusercontent.com/23432432/233464127-9790d512-99fb-428c-9d71-ba5d73a80cdf.png)

Put it somewhere your server can access and create a `.env` file in this project's root with this content
```env
GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service/account/key.json"
```

Replace the value with the correct path to that file and start the server, then you will have push notification enabled.
