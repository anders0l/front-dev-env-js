import React from 'react';
import ErrorBlock from '../../components/error-block';
import './not-found.scss';

class NotFound extends React.Component {
	componentDidMount() {} // fix helmet error

	render() {
		return (
			<div className='notfound'>
				<ErrorBlock
					title='404'
					subtitle='Page Not Found'
					text='It seems that the page you were trying to reach does not exist anymore, or maybe it has just moved. You can start again from the home'
					btntext='Return to Home'
					href='/'
				/>
			</div>
		);
	}
}

export default NotFound;
