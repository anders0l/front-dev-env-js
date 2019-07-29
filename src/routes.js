import NotFoundScreen from 'pages/not-found';
import IndexPage from 'pages/indeх-page';

const routes = [
	{
		path: '/',
		exact: true,
		component: IndexPage
	},
	{
		exact: true,
		component: NotFoundScreen,
		status: 404
	}
];

export default routes;
