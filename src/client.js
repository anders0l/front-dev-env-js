import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import { hydrate } from 'react-dom';

import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/bgset/ls.bgset.js';
import 'lazysizes';

import App from 'app/App';
import routes from './routes';

const Main = () => (
	<BrowserRouter>
		<App>
			{routes.map((route, i) => (
				<Route
					key={route.key || i}
					path={route.path}
					exact={route.exact}
					strict={route.strict}
					render={props => (
						<route.component {...props} route={route}/>
					)}
				/>
			))}
		</App>
	</BrowserRouter>
);


hydrate(
	<Main/>,
	document.getElementById('app'),
);
