"use strict";

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');

const languages = {
	en: require ("./languages/en.json"),
	pl: require("./languages/pl.json")
};


const config = Object.keys(languages).map(lang => ({
	name: lang,
	entry: {
		app: __dirname + '/src/js/app.js'
	},
	mode: 'development',
	
	output: {
		path: path.resolve(__dirname, './dist/' + lang),
		path: __dirname + '/dist/' + lang,
		publicPath: '/dist/' + lang,
		filename: '[name]-[chunkhash].js'
},
	target: 'node',
	module: {
		rules: [

		// Babel	
			{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
			}
		},
		// Eslint
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'eslint-loader',
				options: {
					fix: true,
				  }, 
			},
		},
		// Css
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
		new HtmlWebPackPlugin({
			template:  __dirname + '/src/index.html'
	}),
	new MiniCssExtractPlugin({
		filename: '[name]-[contenthash].css',
		chunkFilename: '[id].css'
}),
new I18nPlugin(languages[lang])
		]

}));

module.exports = config;