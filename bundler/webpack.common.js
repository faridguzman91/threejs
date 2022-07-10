const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    //script path
    entry: path.resolve(__dirname, '../src/shadows.js'),
<<<<<<< HEAD
    output:
    {
=======
    output: {
>>>>>>> 71a119bab8adf9cffbb13f2f5e3567b7b5a8fee0
        hashFunction: 'xxhash64',
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../static')
            }]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true
        }),
        new MiniCSSExtractPlugin()
    ],
    module: {
        rules: [
            // HTML
            {
                test: /\.(html)$/,
                use: [
                    'html-loader'
                ]
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[hash][ext]'
                }
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[hash][ext]'
                }
            }
        ]
    }
}