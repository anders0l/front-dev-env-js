import path from 'path';
import express from 'express';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware';
import config from '../src/_config/main';
import serverConfig from '../internals/webpack/webpack.server.babel';
import clientConfig from '../internals/webpack/webpack.client.babel';
import { format } from './run';

// https://webpack.js.org/configuration/watch/#watchoptions
const watchOptions = {};

function createCompilationPromise(name, compiler, config) {
	return new Promise((resolve, reject) => {
		let timeStart = new Date();

		compiler.plugin('compile', () => {
			timeStart = new Date();
			console.info(`[${format(timeStart)}] Compiling '${name}'...`);
		});

		compiler.plugin('done', stats => {
			console.info(stats.toString(config.stats));

			const timeEnd = new Date();
			const time = timeEnd.getTime() - timeStart.getTime();

			if (stats.hasErrors()) {
				console.info(
					`[${format(timeEnd)}] Failed to compile '${name}' after ${time} ms`
				);

				reject(new Error('Compilation failed!'));
			} else {
				console.info(
					`[${format(timeEnd)}] Finished '${name}' compilation after ${time} ms`
				);

				resolve(stats);
			}
		});
	});
}

let server;

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
	if (server) return server;

	server = express();
	server.use(errorOverlayMiddleware());
	server.use(express.static(path.resolve(__dirname, '../client')));

	// Configure client-side hot module replacement
	clientConfig.entry.client = ['./internals/webpackHotDevClient']
		.concat(clientConfig.entry.client)
		.sort((a, b) => b.includes('polyfill') - a.includes('polyfill'));

	clientConfig.output.filename = clientConfig.output.filename.replace(
		'chunkhash',
		'hash'
	);

	clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace(
		'chunkhash',
		'hash'
	);

	clientConfig.module.rules = clientConfig.module.rules.filter(
		x => x.loader !== 'null-loader'
	);

	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin()
	);

	// Configure server-side hot module replacement
	serverConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';

	serverConfig.output.hotUpdateChunkFilename
		= 'updates/[id].[hash].hot-update.js';

	serverConfig.module.rules = serverConfig.module.rules.filter(
		x => x.loader !== 'null-loader'
	);

	serverConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin()
	);

	// Configure compilation
	const multiCompiler = webpack([clientConfig, serverConfig]);

	const clientCompiler = multiCompiler.compilers.find(
		compiler => compiler.name === 'client'
	);

	const serverCompiler = multiCompiler.compilers.find(
		compiler => compiler.name === 'server'
	);

	const clientPromise = createCompilationPromise(
		'client',
		clientCompiler,
		clientConfig
	);

	const serverPromise = createCompilationPromise(
		'server',
		serverCompiler,
		serverConfig
	);

	// https://github.com/webpack/webpack-dev-middleware
	server.use(
		webpackDevMiddleware(clientCompiler, {
			publicPath: clientConfig.output.publicPath,
			logLevel: 'silent',
			watchOptions
		})
	);

	// https://github.com/glenjamin/webpack-hot-middleware
	server.use(webpackHotMiddleware(clientCompiler, { log: false }));

	let appPromise;
	let appPromiseResolve;
	let appPromiseIsResolved = true;
	serverCompiler.plugin('compile', () => {
		if (!appPromiseIsResolved) return;
		appPromiseIsResolved = false;
		// eslint-disable-next-line no-return-assign
		appPromise = new Promise(resolve => (appPromiseResolve = resolve));
	});

	let app;
	server.use((req, res) => {
		appPromise
			.then(() => app.handle(req, res))
			.catch(error => console.error(error));
	});

	function checkForUpdate(fromUpdate) {
		const hmrPrefix = '[\x1b[35mHMR\x1b[0m] ';
		if (!app.hot) {
			throw new Error(`${hmrPrefix}Hot Module Replacement is disabled.`);
		}
		if (app.hot.status() !== 'idle') {
			return Promise.resolve();
		}
		return app.hot
			.check(true)
			.then(updatedModules => {
				if (!updatedModules) {
					if (fromUpdate) {
						console.info(`${hmrPrefix}Update applied.`);
					}
					return;
				}
				if (updatedModules.length === 0) {
					console.info(`${hmrPrefix}Nothing hot updated.`);
				} else {
					console.info(`${hmrPrefix}Updated modules:`);
					updatedModules.forEach(moduleId =>
						console.info(`${hmrPrefix} - ${moduleId}`)
					);
					checkForUpdate(true);
				}
			})
			.catch(error => {
				if (['abort', 'fail'].includes(app.hot.status())) {
					console.warn(`${hmrPrefix}Cannot apply update.`);
					delete require.cache[require.resolve('../dist/server/server')];
					// eslint-disable-next-line global-require, import/no-unresolved
					app = require('../dist/server/server').default;
					console.warn(`${hmrPrefix}App has been reloaded.`);
				} else {
					console.warn(
						`${hmrPrefix}Update failed: ${error.stack || error.message}`
					);
				}
			});
	}

	serverCompiler.watch(watchOptions, (error, stats) => {
		if (app && !error && !stats.hasErrors()) {
			checkForUpdate().then(() => {
				appPromiseIsResolved = true;
				appPromiseResolve();
			});
		}
	});

	// Wait until both client-side and server-side bundles are ready
	await clientPromise;
	await serverPromise;

	const timeStart = new Date();
	console.info(`[${format(timeStart)}] Launching server...`);

	// Load compiled src/server.js as a middleware
	// eslint-disable-next-line global-require, import/no-unresolved
	app = require('../dist/server/server').default;
	appPromiseIsResolved = true;
	appPromiseResolve();

	// Launch the development server with Browsersync and HMR
	await new Promise((resolve, reject) =>
		browserSync.create().init(
			{
				// https://www.browsersync.io/docs/options
				server: 'src/server.js',
				middleware: [server],
				port: config.BROWSERSYNC_PORT,
				open: false,
				ghostMode: false // TODO: this is temporary
			},
			(error, bs) => (error ? reject(error) : resolve(bs))
		)
	);

	const timeEnd = new Date();
	const time = timeEnd.getTime() - timeStart.getTime();
	console.info(`[${format(timeEnd)}] Server launched after ${time} ms`);
	return server;
}

export default start;
