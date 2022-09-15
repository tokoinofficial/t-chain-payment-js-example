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

