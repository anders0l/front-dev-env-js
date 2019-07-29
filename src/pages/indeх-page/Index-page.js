import React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { appStore } from '../../stores/app-store';

import './Index-page.scss';

@withRouter
@observer
class IndexPage extends React.Component {
	componentDidMount() {
		appStore.getIp({ format: 'json' });
	}

	render() {
		return (
			<div className={'index-page'}>Index Page, your ip = {appStore.ip ? appStore.ip : '... waiting'}</div>
		);
	}
}

export default IndexPage;
