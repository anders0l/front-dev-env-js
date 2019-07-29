import webpack from 'webpack';
import path from 'path';
import AssetsPlugin from 'webpack-assets-manifest';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isAnalyze = process.env.ANALYZE === 'true';
module.exports = require('./webpack.base.babel')({
	name: 'client',

	entry: {
		client: ['./src/client.js']
	},

	output: {
		path: path.resolve(process.cwd(), 'dist/client')
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		},
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				SERVER_PORT: JSON.stringify(process.env.PORT),
				BROWSER_PORT: JSON.stringify(process.env.BROWSER_PORT)
			}
		}),
		new AssetsPlugin({
			output: path.resolve(process.cwd(), 'dist/server/assets.json'),
			publicPath: '/assets/',
			writeToDisk: true
		}),
		new MiniCssExtractPlugin({}),
		// Webpack Bundle Analyzer
		// https://github.com/th0r/webpack-bundle-analyzer
		...(isAnalyze ? [new BundleAnalyzerPlugin()] : [])
	],

	target: 'web',

	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	// https://webpack.js.org/configuration/node/
	// https://github.com/webpack/node-libs-browser/tree/master/mock
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},

	performance: {
		hints: false
	},

	stats: {
		colors: true,
		chunks: false,
		modules: false,
		reasons: false,
		children: false,
		source: false,
		publicPath: false,
	}
});
