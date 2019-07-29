import React from 'react';
import PropTypes from 'prop-types';
import './error-block.scss';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

@withRouter
class ErrorBlock extends React.Component {
	render() {
		const { title, subtitle, text, btntext, href } = this.props;
		return (
			<div className='error-block'>
				<div className='error-block__title'>{title}</div>
				<div className='error-block__subtitle'>{subtitle}</div>
				<div className='error-block__text'>{text}</div>
				<div className='error-block__button'>
					<Link to={href}>{btntext}</Link>
				</div>
			</div>
		);
	}
}

ErrorBlock.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	text: PropTypes.string,
	btntext: PropTypes.string,
	href: PropTypes.string,
	onClick: PropTypes.func
};

export default ErrorBlock;
