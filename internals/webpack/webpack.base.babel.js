import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import pkg from '../../package.json';

const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

if (isDev) {
	require('dotenv-safe').config({ allowEmptyValues: true });
}

export const reScript = /\.(js)$/;
export const reStyle = /\.(css|scss)$/;
export const reImage = /\.(jpg|jpeg|png)$/;

console.log('Webpack mode: ', isDev ? 'development' : 'production');

const optimzations = {
	minimizer: isProduction || isTest ? [
		new UglifyJsPlugin({
			cache: true,
			parallel: true,
			sourceMap: isTest, // set to true if you want JS source maps
			uglifyOptions: {
				output: {
					comments: false
				}
			}
		}),
		new OptimizeCSSAssetsPlugin({
			cssProcessorOptions: { map: { inline: false } }
		})
	] : []
};

module.exports = options => ({
	entry: options.entry,
	name: options.name,
	mode: isProduction || isTest ? 'production' : 'development',
	devtool: isDev ? 'source-map' : 'none',

	optimization: {
		...optimzations,
		...options.optimization
	},

	output: {
		publicPath: '/assets/',
		filename: isDev
			? '[name].js'
			: '[name].[chunkhash:8].js',
		chunkFilename: isDev
			? '[name].chunk.js'
			: '[name].[chunkhash:8].chunk.js',
		// Point sourcemap entries to original disk location (format as URL on Windows)
		devtoolModuleFilenameTemplate: info =>
			path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
		sourceMapFilename: '[file].map',
		...options.output
	},

	module: {
		// Make missing exports an error instead of warning
		strictExportPresence: true,

		rules: [
			{
				test: reScript,
				loader: 'babel-loader',
				include: [
					path.join(process.cwd(), 'src')
				],
				exclude: path.resolve('./node_modules'),
				options: {
					// https://github.com/babel/babel-loader#options
					cacheDirectory: isDev,

					// https://babeljs.io/docs/usage/options/
					babelrc: false,
					presets: [
						"@babel/react",
						["@babel/preset-env", {
							shippedProposals: true,
							...isDev
								? {
									targets: {
										node: "current"
									},
								}
								: {
									targets: options.name === 'client'
										? {
											browsers: pkg.browserslist,
										}
										: {
											node: pkg.engines.node.match(/(\d+\.?)+/)[0]
										},
									forceAllTransforms: true, // for UglifyJS
									modules: false,
									useBuiltIns: false,
									debug: false
								}
						},
						],
					],
					plugins: [
						"@babel/plugin-transform-runtime",
						[
							require('@babel/plugin-proposal-decorators'),
							{ legacy: true }
						],
						['@babel/plugin-proposal-class-properties', { loose: true }],
					]
				}
			},
			{
				test: reStyle,
				use: options.name === 'client' ? [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: isDev, // only enable hot in development
						},
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: 'postcss.config.js'
							}
						}
					},
					'sass-loader'
				] : [
					{ loader: 'null-loader' }
				]
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					context: 'src/',
					name: '[path][name].[ext]',
					emitFile: options.name === 'client'
				}
			},
			{
				test: reImage,
				include: [
					path.join(process.cwd(), 'src/image')
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							context: 'src/',
							name: '[path][name].[ext]',
							emitFile: options.name === 'client'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 80,
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
						},
					},
				],
			},

			// Exclude dev modules from production build
			...(isDev
				? []
				: [
					{
						test: path.resolve(
							__dirname,
							'../node_modules/react-deep-force-update/lib/index.js'
						),
						loader: 'null-loader'
					}
				])
		]
	},

	plugins: options.plugins || [],

	resolve: {
		modules: ['src', 'node_modules']
	},

	target: options.target, // Make web variables accessible to webpack, e.g. window

	stats: options.stats || {},

	externals: options.externals || [],

	performance: options.performance || {}
});
