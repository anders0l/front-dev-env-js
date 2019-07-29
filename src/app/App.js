import React from 'react';
import { Switch } from 'react-router';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import { withRouter } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './page-transitions.scss';
import './App.scss';

import ErrorBoundary from '../components/error-boundary';

@withRouter
@observer
export default class App extends React.Component {
	componentDidUpdate(prevProps) {
		if (prevProps.location.pathname !== this.props.location.pathname) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		const { location } = this.props;
		const currentKey = location.pathname.split('/')[1] || '/';
		return (
			<ErrorBoundary>
				<Layout className={`page page-${currentKey}`}>
					<TransitionGroup component='main' className={`page-main`} style={{ paddingTop: 10 }}>
						<CSSTransition key={currentKey} timeout={{ enter: 500, exit: 0 }} classNames='fade'>
							<Switch location={location}>
								{this.props.children}
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				</Layout>
			</ErrorBoundary>
		);
	}

	static propTypes = {
		location: PropTypes.shape({
			pathname: PropTypes.string
		}),
		history: PropTypes.object,
		children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
	}
}
