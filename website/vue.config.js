//const webpack = require('webpack');
const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/t-chain-payment-js-example/' : '/',
  // Fix dynamic routes for github pages
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    404: {
      entry: 'src/main.js',
      template: 'public/404.html',
      filename: '404.html',
    },
  },
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('@layouts', path.resolve(__dirname, 'src/layouts'))
      .set('@router', path.resolve(__dirname, 'src/router'))
      .set('@views', path.resolve(__dirname, 'src/views'))
      .set('@public', path.resolve(__dirname, 'public'))
    // Fix issues with npm link for local testing of the SDK
    config.resolve.symlinks(false)
    // Target web build
    config.target('web')
    // disable host check for local dev server
    config.devServer.compress(true).disableHostCheck(true)
  },
}
