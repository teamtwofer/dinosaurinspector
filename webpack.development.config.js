const webpack = require('webpack');
const defaults = require('./webpack.defaults');
module.exports = Object.assign({}, defaults, {
  plugins: [
    ...defaults.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
