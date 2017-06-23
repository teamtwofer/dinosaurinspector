const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const defaults = require('./webpack.defaults.js');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'client', 'entry.tsx');

module.exports = Object.assign({}, defaults, {
  entry: ['babel-polyfill', mainPath],
  devtool: 'cheap-module-source-map',
  output: {
    path: defaults.output.path,
    filename: '[name].min.js',
    publicPath: '/build',
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'client'),
          path.resolve(__dirname, 'types'),
          path.resolve(__dirname, 'lang'),
        ],
        exclude: [nodeModulesPath],
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.client.json',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                modules: true,
                localIdentName: '[local]--[hash:base64:5]',
                camelCase: true,
              },
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    ...defaults.plugins,
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
