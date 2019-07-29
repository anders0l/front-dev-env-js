/* eslint-disable global-require */

const pkg = require('./package.json');

module.exports = () => ({
	// The list of plugins for PostCSS
	// https://github.com/postcss/postcss
	plugins: [
		// Transfer @import rule by inlining content, e.g. @import 'normalize.css'
		// https://github.com/postcss/postcss-import
		require('postcss-import')(),
		// W3C calc() function, e.g. div { height: calc(100px - 2em); }
		// https://github.com/postcss/postcss-calc
		require('postcss-calc')(),
		// Allows you to nest one style rule inside another
		// https://github.com/jonathantneal/postcss-nesting
		require('postcss-nesting')(),
		// Unwraps nested rules like how Sass does it
		// https://github.com/postcss/postcss-nested
		require('postcss-nested')(),
		// Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
		// https://github.com/postcss/postcss-selector-not
		require('postcss-selector-not')(),
		// Postcss flexbox bug fixer
		// https://github.com/luisrudge/postcss-flexbugs-fixes
		require('postcss-flexbugs-fixes')(),
		// Add vendor prefixes to CSS rules using values from caniuse.com
		// https://github.com/postcss/autoprefixer
		require('autoprefixer')({
			overrideBrowserslist: pkg.browserslist,
			flexbox: 'no-2009'
		})
	]
});
