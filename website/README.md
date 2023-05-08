# t-chain-payment-js-example

### Live demo

See it at https://tokoinofficial.github.io/t-chain-payment-js-example

Note: this live demo doesn't have push notification enabled

### Required
- Need to install Metamask to use t-chain-payment or 
- Install the t-wallet mobile app to scan QR code

#### Clone the project
```bash
$ git clone https://github.com/tokoinofficial/t-chain-payment-js-example.git
$ cd t-chain-payment-js-example/website
```

#### install dependencies
```
$ yarn 
```

#### \[Optional\] Redirect webhooks to your local server
To receive notification via firebase, you need to update the config in these files
- `public/firebase.json`
- `public/firebase-messaging-sw.js`

Reference:

> https://github.com/firebase/quickstart-js/tree/master/messaging

Go to the push notification webhook dashboard to forward notification subscription to your local server:

https://webhook.site/#!/b87e82eb-4d9a-4e7d-80da-e7588b15b2c6/1b3513f1-38f9-4a88-80c9-258318ac9c75/1

![Choose XHR Redirect for firebase](https://user-images.githubusercontent.com/23432432/233459089-4244d904-8c3c-4eb4-96f9-79547bab9cb6.png)

![Configure XHR Redirect for firebase](https://user-images.githubusercontent.com/23432432/233459238-0158e83c-4298-49cb-9ec2-8a765b88bb8f.png)

Keep that browser tab running and open a new tab.

Go to the T-Chain sandboxed webhook dashboard to forward transaction status update to your local server:

https://webhook.site/#!/f1426197-7c6b-483c-b55e-50931698c7aa/2f2b54b2-3ba2-4a11-b211-fbbabc2ef3ab/1

![Choose XHR Redirect for t-chain](https://user-images.githubusercontent.com/23432432/233459089-4244d904-8c3c-4eb4-96f9-79547bab9cb6.png)

![Configure XHR Redirect for t-chain](https://user-images.githubusercontent.com/23432432/233460005-cd149ad5-0ad2-48af-b7f3-d6f7f02a0dcf.png)

Keep the 2 tabs running when you are experimenting with the web app in order to receive push notification.


#### Run
```
$ yarn serve
```

### Build

Change `publicPath` in `vue.config.js` to corresponding path that you will deploy on your server if you will serve it in sub-route.

```js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '/',
  ...
}
```

```
yarn build
```