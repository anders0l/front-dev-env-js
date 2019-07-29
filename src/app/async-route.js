import React from 'react';

const moduleDefautExport = module => module.default || module;

export default function asyncRoute(getComponent) {
	return class AsyncRoute extends React.Component {
		state = {
			Component: null
		};

		UNSAFE_componentWillMount() {
			if (!this.state.Component) {
				getComponent()
					.then(moduleDefautExport)
					.then((Component) => {
						this.setState(() => ({
							Component,
							loadFailed: null
						}));
					});
			}
		}

		render() {
			const { Component } = this.state;

			return Component
				? <Component {...this.props} />
				: null;
		}
	};
}
