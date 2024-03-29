module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
		jest: true
	},
	globals: {
		expect: true,
		fetch: true,
		dedent: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	settings: {
		react: {
			version: require('./package.json').dependencies.react,
		},
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 8,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			experimentalObjectRestSpread: true,
			legacyDecorators: true
		}
	},
	rules: {
		indent: [
			'error',
			'tab'
		],
		'space-infix-ops': ['error', {
			int32Hint: false
		}],
		'no-console': [
			'error', {
				allow: [
					'log',
					'warn',
					'error'
				]
			}
		],
		'react/jsx-no-target-blank': 0,
		'arrow-spacing': ['error', { before: true, after: true }],
		// enforce line breaks after opening and before closing array brackets
		// https://eslint.org/docs/rules/array-bracket-newline
		// TODO: enable? semver-major
		'array-bracket-newline': ['off', 'consistent'], // object option alternative: { multiline: true, minItems: 3 }

		// enforce line breaks between array elements
		// https://eslint.org/docs/rules/array-element-newline
		// TODO: enable? semver-major
		'array-element-newline': ['off', {
			multiline: true,
			minItems: 3
		}],

		// enforce spacing inside array brackets
		'array-bracket-spacing': ['error', 'never'],

		// enforce spacing inside single-line blocks
		// https://eslint.org/docs/rules/block-spacing
		'block-spacing': ['error', 'always'],

		// enforce one true brace style
		'brace-style': ['error', '1tbs', {
			allowSingleLine: true
		}],

		// enforce or disallow capitalization of the first letter of a comment
		// https://eslint.org/docs/rules/capitalized-comments
		'capitalized-comments': ['off', 'never', {
			line: {
				ignorePattern: '.*',
				ignoreInlineComments: true,
				ignoreConsecutiveComments: true
			},
			block: {
				ignorePattern: '.*',
				ignoreInlineComments: true,
				ignoreConsecutiveComments: true
			}
		}],

		// not require trailing commas in multiline object literals
		'comma-dangle': ['error', 'never'],

		// enforce spacing before and after comma
		'comma-spacing': ['error', {
			before: false,
			after: true
		}],

		// enforce one true comma style
		'comma-style': ['error', 'last'],

		// disallow padding inside computed properties
		'computed-property-spacing': ['error', 'never'],

		// enforces consistent naming when capturing the current execution context
		'consistent-this': 'off',

		// enforce newline at the end of file, with no multiple empty lines
		'eol-last': ['error', 'always'],

		// enforce spacing between functions and their invocations
		// https://eslint.org/docs/rules/func-call-spacing
		'func-call-spacing': ['error', 'never'],

		// requires function names to match the name of the variable or property to which they are
		// assigned
		// https://eslint.org/docs/rules/func-name-matching
		'func-name-matching': ['off', 'always', {
			includeCommonJSModuleExports: false
		}],

		// enforces use of function declarations or expressions
		// https://eslint.org/docs/rules/func-style
		// TODO: enable
		'func-style': ['off', 'expression'],

		// Blacklist certain identifiers to prevent them being used
		// https://eslint.org/docs/rules/id-blacklist
		'id-blacklist': 'off',

		// this option enforces minimum and maximum identifier lengths
		// (variable names, property names etc.)
		'id-length': 'off',

		// require identifiers to match the provided regular expression
		'id-match': 'off',

		// specify whether double or single quotes should be used in JSX attributes
		// https://eslint.org/docs/rules/jsx-quotes
		'jsx-quotes': ['error', 'prefer-single'],

		// enforces spacing between keys and values in object literal properties
		'key-spacing': ['error', {
			beforeColon: false,
			afterColon: true
		}],

		// require a space before & after certain keywords
		'keyword-spacing': ['error', {
			before: true,
			after: true,
			overrides: {
				return: {
					after: true
				},
				throw: {
					after: true
				},
				case: {
					after: true
				}
			}
		}],

		// enforce position of line comments
		// https://eslint.org/docs/rules/line-comment-position
		// TODO: enable?
		'line-comment-position': ['off', {
			position: 'above',
			ignorePattern: '',
			applyDefaultPatterns: true
		}],

		// disallow mixed 'LF' and 'CRLF' as linebreaks
		// https://eslint.org/docs/rules/linebreak-style
		'linebreak-style': ['error', 'unix'],

		// enforces empty lines around comments
		'lines-around-comment': 'off',

		// require or disallow newlines around directives
		// https://eslint.org/docs/rules/lines-around-directive
		'lines-around-directive': ['error', {
			before: 'always',
			after: 'always'
		}],

		// specify the maximum depth that blocks can be nested
		'max-depth': ['off', 4],

		// specify the maximum length of a line in your program
		// https://eslint.org/docs/rules/max-len
		'max-len': ['error', 120, 2, {
			ignoreUrls: true,
			ignoreComments: false,
			ignoreRegExpLiterals: true,
			ignoreStrings: true,
			ignoreTemplateLiterals: true
		}],

		// specify the max number of lines in a file
		// https://eslint.org/docs/rules/max-lines
		'max-lines': ['off', {
			max: 300,
			skipBlankLines: true,
			skipComments: true
		}],

		// specify the maximum depth callbacks can be nested
		'max-nested-callbacks': 'off',

		// limits the number of parameters that can be used in the function declaration.
		'max-params': ['off', 3],

		// specify the maximum number of statement allowed in a function
		'max-statements': ['off', 10],

		// restrict the number of statements per line
		// https://eslint.org/docs/rules/max-statements-per-line
		'max-statements-per-line': ['off', {
			max: 1
		}],

		// enforce a particular style for multiline comments
		// https://eslint.org/docs/rules/multiline-comment-style
		'multiline-comment-style': ['off', 'starred-block'],

		// require multiline ternary
		// https://eslint.org/docs/rules/multiline-ternary
		// TODO: enable?
		'multiline-ternary': ['off', 'never'],

		// disallow the omission of parentheses when invoking a constructor with no arguments
		// https://eslint.org/docs/rules/new-parens
		'new-parens': 'error',

		// allow/disallow an empty newline after var statement
		'newline-after-var': 'off',

		// https://eslint.org/docs/rules/newline-before-return
		'newline-before-return': 'off',

		// enforces new line after each method call in the chain to make it
		// more readable and easy to maintain
		// https://eslint.org/docs/rules/newline-per-chained-call
		'newline-per-chained-call': ['error', {
			ignoreChainWithDepth: 4
		}],

		// disallow use of the Array constructor
		'no-array-constructor': 'error',

		// disallow use of bitwise operators
		// https://eslint.org/docs/rules/no-bitwise
		'no-bitwise': 'error',

		// disallow use of the continue statement
		// https://eslint.org/docs/rules/no-continue
		'no-continue': 'error',

		// disallow comments inline after code
		'no-inline-comments': 'off',

		// disallow if as the only statement in an else block
		// https://eslint.org/docs/rules/no-lonely-if
		'no-lonely-if': 'error',

		// disallow un-paren'd mixes of different operators
		// https://eslint.org/docs/rules/no-mixed-operators
		'no-mixed-operators': ['error', {
			// the list of arthmetic groups disallows mixing `%` and `**`
			// with other arithmetic operators.
			groups: [
				['%', '**'],
				['%', '+'],
				['%', '-'],
				['%', '*'],
				['%', '/'],
				['**', '+'],
				['**', '-'],
				['**', '*'],
				['**', '/'],
				['&', '|', '^', '~', '<<', '>>', '>>>'],
				['==', '!=', '===', '!==', '>', '>=', '<', '<='],
				['&&', '||'],
				['in', 'instanceof']
			],
			allowSamePrecedence: false
		}],

		// disallow mixed spaces and tabs for indentation
		'no-mixed-spaces-and-tabs': 'error',

		// disallow use of chained assignment expressions
		// https://eslint.org/docs/rules/no-multi-assign
		'no-multi-assign': ['error'],

		// disallow multiple empty lines and only one newline at the end
		'no-multiple-empty-lines': ['error', {
			max: 2,
			maxEOF: 1
		}],

		// disallow negated conditions
		// https://eslint.org/docs/rules/no-negated-condition
		'no-negated-condition': 'off',

		// disallow nested ternary expressions
		'no-nested-ternary': 'error',

		// disallow space between function identifier and application
		'no-spaced-func': 'error',

		// disallow the use of ternary operators
		'no-ternary': 'off',

		// disallow trailing whitespace at the end of lines
		'no-trailing-spaces': ['error', {
			skipBlankLines: false,
			ignoreComments: false
		}],

		// disallow the use of Boolean literals in conditional expressions
		// also, prefer `a || b` over `a ? a : b`
		// https://eslint.org/docs/rules/no-unneeded-ternary
		'no-unneeded-ternary': ['error', {
			defaultAssignment: false
		}],

		// disallow whitespace before properties
		// https://eslint.org/docs/rules/no-whitespace-before-property
		'no-whitespace-before-property': 'error',

		// enforce the location of single-line statements
		// https://eslint.org/docs/rules/nonblock-statement-body-position
		'nonblock-statement-body-position': ['error', 'beside', {
			overrides: {}
		}],

		// enforce "same line" or "multiple line" on object properties.
		// https://eslint.org/docs/rules/object-property-newline
		'object-property-newline': ['error', {
			allowMultiplePropertiesPerLine: true
		}],

		// allow just one var statement per function
		'one-var': ['error', 'never'],

		// require a newline around variable declaration
		// https://eslint.org/docs/rules/one-var-declaration-per-line
		'one-var-declaration-per-line': ['error', 'always'],

		// require assignment operator shorthand where possible or prohibit it entirely
		// https://eslint.org/docs/rules/operator-assignment
		'operator-assignment': ['error', 'always'],

		// Requires operator at the beginning of the line in multiline statements
		// https://eslint.org/docs/rules/operator-linebreak
		'operator-linebreak': ['error', 'before'],

		// disallow padding within blocks
		'padded-blocks': ['error', {
			blocks: 'never',
			classes: 'never',
			switches: 'never'
		}],

		// Require or disallow padding lines between statements
		// https://eslint.org/docs/rules/padding-line-between-statements
		'padding-line-between-statements': 'off',

		// require quotes around object literal property names
		// https://eslint.org/docs/rules/quote-props.html
		'quote-props': ['error', 'as-needed', {
			keywords: false,
			unnecessary: true,
			numbers: false
		}],

		// specify whether double or single quotes should be used
		quotes: ['error', 'single', {
			avoidEscape: true,
			allowTemplateLiterals: true
		}],

		// do not require jsdoc
		// https://eslint.org/docs/rules/require-jsdoc
		'require-jsdoc': 'off',

		// require or disallow use of semicolons instead of ASI
		semi: ['error', 'always'],

		// enforce spacing before and after semicolons
		'semi-spacing': ['error', {
			before: false,
			after: true
		}],

		// requires object keys to be sorted
		'sort-keys': ['off', 'asc', {
			caseSensitive: false,
			natural: true
		}],

		// sort variables within the same declaration block
		'sort-vars': 'off',

		// require or disallow space before blocks
		'space-before-blocks': 'error',

		// require or disallow space before function opening parenthesis
		// https://eslint.org/docs/rules/space-before-function-paren
		'space-before-function-paren': ['error', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always'
		}],

		// require or disallow spaces inside parentheses
		'space-in-parens': ['error', 'never'],

		// Require or disallow spaces before/after unary operators
		// https://eslint.org/docs/rules/space-unary-ops
		'space-unary-ops': ['error', {
			words: true,
			nonwords: false,
			overrides: {}
		}],

		// require or disallow a space immediately following the // or /* in a comment
		// https://eslint.org/docs/rules/spaced-comment
		'spaced-comment': ['error', 'always', {
			line: {
				exceptions: ['-', '+'],
				markers: ['=', '!'] // space here to support sprockets directives
			},
			block: {
				exceptions: ['-', '+'],
				markers: ['=', '!'], // space here to support sprockets directives
				balanced: true
			}
		}],

		// Require or disallow spacing between template tags and their literals
		// https://eslint.org/docs/rules/template-tag-spacing
		'template-tag-spacing': ['error', 'never'],

		// require or disallow the Unicode Byte Order Mark
		// https://eslint.org/docs/rules/unicode-bom
		'unicode-bom': ['error', 'never'],

		// require regex literals to be wrapped in parentheses
		'wrap-regex': 'off'
	}
};
