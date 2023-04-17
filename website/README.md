# t-chain-payment-js-example

### Live demo

See it at https://tokoinofficial.github.io/t-chain-payment-js-example

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