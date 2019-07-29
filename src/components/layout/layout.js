import React from 'react';
import PropTypes from 'prop-types';
import './_reset.scss';
import './_defaults.scss';
import Footer from '../footer';
import Header from '../header';

class Layout extends React.Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		className: PropTypes.string
	};

	render() {
		return (
			<div className = {this.props.className}>
				<Header />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}

export default Layout;
