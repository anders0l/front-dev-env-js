import path from 'path';
import nodeExternals from 'webpack-node-externals';

import { reStyle, reImage } from './webpack.base.babel';

const isDev = process.env.NODE_ENV !== 'production';

module.exports = require('./webpack.base.babel')({
	name: 'server',

	entry: {
		server:'./src/server.js'
	},

	output: {
		path: path.resolve(process.cwd(), 'dist/server'),
		filename: '[name].js',
		libraryTarget: 'commonjs2'
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				}
			}
		},
	},

	target: 'node',

	// Do not replace node globals with polyfills
	// https://webpack.js.org/configuration/node/
	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false
	},

	externals: [
		'./assets.json',
		...(isDev
			? [
				nodeExternals({
					whitelist: [reStyle, reImage]
				})
			]
			: []
		)
	],

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
