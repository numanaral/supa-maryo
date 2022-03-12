/**
 * @typedef {import('eslint').Linter.Severity} Severity
 */

/**
 * @typedef {Object} ESLintRules
 * @property {import('eslint/rules').ESLintRules} rules
 * @typedef {import('eslint').Linter.Config&ESLintRules} ESLintConfig
 */

/** @type {Severity} */
const OFF = 0;
/** @type {Severity} */
const WARN = 1;
/** @type {Severity} */
const ERROR = 2;

/**
 * Useful sources:
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md#getting-started---linting-with-type-information
 * @see https://github.com/typescript-eslint/typescript-eslint/issues/2211#issuecomment-643678631
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#my-linting-feels-really-slow
 */

/**
 * @type {ESLintConfig}
 */
module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
		// 'jest/globals': true,
	},
	extends: [
		// 'eslint:recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:react/recommended',
		'airbnb',
		// 'plugin:jest/recommended',
		'plugin:prettier/recommended',
		// 'plugin:@typescript-eslint/recommended',
		// 'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		// tsconfigRootDir: __dirname,
		// project: ['./tsconfig.json'],
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	// ignorePatterns: [
	// 	'.eslintrc.js',
	// ],
	plugins: [
		'react',
		'react-hooks',
		'import',
		'@typescript-eslint',
		'prettier',
		// 'jest',
	],
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
	rules: {
		'arrow-parens': [ERROR, 'as-needed'],
		camelcase: [ERROR, { allow: ['^unstable_', '^__'] }],
		'default-case': [ERROR, { commentPattern: 'No Default' }],
		'no-param-reassign': [
			ERROR,
			{
				props: true,
				ignorePropertyModificationsFor: ['draft', 'acc'],
				ignorePropertyModificationsForRegex: ['[Rr]ef$', '^acc'],
			},
		],
		'import/no-named-as-default': OFF,
		'import/prefer-default-export': OFF,
		'max-len': [
			ERROR,
			{
				// Ignore import lines and jsx props
				// \w+=".*$ doesn't work
				ignorePattern: '^(import|export) .*|S*w*=".*$',
				ignoreComments: true,
				ignoreUrls: true,
				ignoreRegExpLiterals: true,
				ignoreTrailingComments: true,
				ignoreTemplateLiterals: true,
			},
		],
		'no-alert': WARN,
		'no-console': [WARN, { allow: ['warn', 'error', 'debug', 'table'] }],
		'no-continue': OFF,
		'no-debugger': WARN,
		'no-plusplus': OFF,
		'no-underscore-dangle': OFF,
		'no-restricted-exports': OFF,
		'react/function-component-definition': OFF,
		'react-hooks/exhaustive-deps': WARN,
		'react-hooks/rules-of-hooks': ERROR,
		'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx'] }],
		'react/jsx-props-no-spreading': OFF,
		'react/no-array-index-key': OFF,
		'prettier/prettier': ERROR,
		// Override for macros
		/** @see https://styled-components.com/docs/tooling#enforce-macro-imports */
		'no-restricted-imports': [
			'error',
			{
				paths: [
					{
						name: 'styled-components',
						message: 'Please import from styled-components/macro.',
					},
				],
				patterns: ['!styled-components/macro'],
			},
		],
		// Overrides for ts
		'react/prop-types': OFF,
		'react/require-default-props': OFF,
		'react/jsx-uses-react': OFF,
		'react/react-in-jsx-scope': OFF,
		'no-unused-vars': OFF,
		'@typescript-eslint/no-unused-vars': [
			ERROR,
			{
				/**
				 * If using css prop, you need this for the macro even if you
				 * don't use the styled.
				 *
				 * import styled from 'styled-components/macro';
				 * @see https://styled-components.com/docs/api#usage-with-the-babel-macro
				 */
				varsIgnorePattern: '(^_|styled)',
				argsIgnorePattern: '^_',
				ignoreRestSiblings: true,
			},
		],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'no-undef': OFF,
		'no-use-before-define': OFF,
		'@typescript-eslint/no-use-before-define': [ERROR],
		'no-redeclare': OFF,
		'@typescript-eslint/no-redeclare': [ERROR],
		'no-shadow': OFF,
		'@typescript-eslint/no-shadow': [ERROR],
		'no-useless-constructor': OFF,
		'@typescript-eslint/no-useless-constructor': [ERROR],
		'no-empty-function': OFF,
		'@typescript-eslint/no-empty-function': [ERROR],
	},
};
