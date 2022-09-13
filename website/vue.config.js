const webpack = require('webpack');
const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('@layouts', path.resolve(__dirname, 'src/layouts'))
      .set('@router', path.resolve(__dirname, 'src/router'))
      .set('@views', path.resolve(__dirname, 'src/views'))
  }
}
