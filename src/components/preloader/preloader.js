import React from 'react';
import './Preloader.scss';

class Preloader extends React.Component {
	render() {
		return (
			<div className='preloader-wrapper'>
				<div className='preloader'></div>
			</div>
		);
	}
}

export default Preloader;
