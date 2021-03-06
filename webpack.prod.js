const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const workbox = require ("workbox-webpack-plugin");



module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin(),
		new workbox.GenerateSW({
			swDest: './sw.js'
        })
    ],
    optimization: {
        minimizer: [
          new TerserPlugin({}),
          new CssMinimizerPlugin(),
        ],
    }, 
    output: {
        libraryTarget: 'var',
        library: 'Client',
        clean: true, // use instead of clean-webpack-plugin

    }
}
