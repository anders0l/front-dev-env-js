import React from 'react';
import { Helmet } from 'react-helmet';
import IndexPage from './Index-page';

export default () => ([
	<Helmet key='Index'>
		<title>Home</title>
		<meta name='description' content='Home page' />
	</Helmet>,
	<IndexPage key='IndexComponent'/>
]);
