const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'client', 'entry.ts');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        mainPath
    ],
    output: {
        path: buildPath,
        filename: '[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                include: [
                    path.resolve(__dirname, 'client')        
                ],
                options: {
                    configFileName: 'tsconfig.client.json'
                },
                exclude: [nodeModulesPath]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),

        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
}