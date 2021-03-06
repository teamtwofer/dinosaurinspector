const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'client', 'entry.tsx');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    mainPath,
  ],
  output: {
    path: buildPath,
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: [
      '.webpack.js',
      '.web.js',
      '.js',
      '.json',
      '.ts',
      '.tsx',
      '.scss',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'react-hot-loader/webpack',
          },
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

        include: [
          path.resolve(__dirname, 'client'),
          path.resolve(__dirname, 'types'),
          path.resolve(__dirname, 'lang'),
        ],
        exclude: [nodeModulesPath],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              camelCase: true,
            },
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
          {
            loader: 'postcss-loader', // autoprefixer and minification
            options: {
              plugins: loader => [
                require('autoprefixer')({ grid: true }),
                require('cssnano')(),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      tagging:
        process.env.NODE_ENV === 'production'
          ? '<script async src="https://getmirrorshades.com/agent.js" data-siteId="MA-WAEYPG-TNT"></script>'
          : '',
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
