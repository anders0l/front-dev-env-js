import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import serverTiming from './middlewares/server-timing';
// -----------------------------------------------------------------------------
// Import react and components
// -----------------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './routes';

import App from 'app/App';
import Html from 'app/Html';

import assets from './assets.json';
import config from './_config/main';

const app = express();

// -----------------------------------------------------------------------------
// Setup express server
// -----------------------------------------------------------------------------
app.set('trust proxy', 1);
app.disable('etag');
app.disable('x-powered-by');
// -----------------------------------------------------------------------------
// Register express middleware
// -----------------------------------------------------------------------------
app.use(serverTiming);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// for dev and prod we have different statup scripts
if (process.env.NODE_ENV != 'production' && process.env.NODE_ENV != 'test') {
	// get directory of absolute path to this file and add ../client
	app.use('/assets', express.static(path.resolve(path.dirname(process.argv[1]), '../dist/client')));
} else {
	app.use('/assets', express.static(path.resolve(path.dirname(process.argv[1]), '../client'), {
		maxAge: '30 days',
		index: false,
		etag: false
	}));
}

// -----------------------------------------------------------------------------
// Setup maintenance routes
// -----------------------------------------------------------------------------
app.get('/healthcheck', (req, res) => {
	res.send('OK');
});
// -----------------------------------------------------------------------------
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
	try {
		const context = {};
		const data = {};

		data.children = ReactDOM.renderToString(
			<StaticRouter location={req.url} context={context}>
				<App>
					{renderRoutes(routes)}
				</App>
			</StaticRouter>
		);
		const clientStyle = assets['client.css'];
		data.styles = clientStyle ? [clientStyle] : [];

		data.scripts = [assets['client.js'], assets['vendor.js']];

		if (context.status) {
			res.status(context.status);
		}

		if (context.url) {
			res.redirect(context.url);
			return;
		}

		const html = ReactDOM.renderToStaticMarkup(
			<Html {...data} />
		);

		res.send(`<!doctype html>${html}`);
	} catch (err) {
		next(err);
	}
});

// -----------------------------------------------------------------------------
// Launch the server (NOTE: Must be sync with option in runServer.js)
// -----------------------------------------------------------------------------

if (!module.hot) {
	app.listen(config.SERVER_PORT, () => {
		console.info(`The server is running at http://localhost:${config.SERVER_PORT}/`); // eslint-disable-line no-console
	});
}
// -----------------------------------------------------------------------------
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
	app.hot = module.hot;
	module.hot.accept('app/App');
}

export default app;
