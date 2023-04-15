//const webpack = require('webpack');
const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/t-chain-payment-js-example/' : '/',
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('@layouts', path.resolve(__dirname, 'src/layouts'))
      .set('@router', path.resolve(__dirname, 'src/router'))
      .set('@views', path.resolve(__dirname, 'src/views'))
    // Fix issues with npm link for local testing of the SDK
    config.resolve.symlinks(false)
  }
}
