"use strict";

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/js/app.js',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: "app.js"
	},
	target: 'node',
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			}
		},
		{
			test: /\.scss$/,
			use: [ 'style-loader', 
			MiniCssExtractPlugin.loader, 
			{
			  loader: 'css-loader',
			  options: {
				url: false,
			  },
			},
			'postcss-loader',
			'sass-loader']
		  }
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
		  filename: 'styles.css',
		}),
	  ]
};


