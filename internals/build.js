import webpack from 'webpack';
import clientConfig from './webpack/webpack.client.babel';
import serverConfig from './webpack/webpack.server.babel';

/**
 * Creates application bundles from the source files.
 */
function bundle() {
	return new Promise((resolve, reject) => {
		webpack([clientConfig, serverConfig]).run((err, stats) => {
			if (err) {
				return reject(err);
			}

			console.info(stats.toString({
				cached: false,
				cachedAssets: false,
				chunks: false,
				chunkModules: false,
				colors: true,
				hash: true,
				modules: false,
				reasons: false,
				timings: false,
				version: true,
			}));
			if (stats.hasErrors()) {
				return reject(new Error('Webpack compilation errors'));
			}

			return resolve();
		});
	});
}

export default bundle;
