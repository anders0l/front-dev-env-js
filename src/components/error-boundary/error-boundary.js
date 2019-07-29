import React from 'react';
import PropTypes from 'prop-types';

import ErrorBlock from '../error-block';


class ErrorBoundary extends React.Component {
	state = {
		hasAppError: false
	};

	componentDidCatch() {
		this.setState({ hasAppError: true });
	}

	refresh = () => {
		location.reload();
	};

	render() {
		if (this.state.hasAppError) {
			return (
				<ErrorBlock
					title='Oops'
					subtitle='Something went wrong'
					text=''
					btntext='Refresh page'
					onClick={this.refresh}
				/>
			);
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.element.isRequired
};

export default ErrorBoundary;
