import { defineConfig } from 'oxlint';

import { types } from './types.ts';
import { base } from './base.ts';

export const frontend = defineConfig({
	extends: [base, types],
	env: {
		browser: true,
		es2024: true,
		node: true,
	},
	plugins: ['react', 'react-perf', 'jsx-a11y'],
	jsPlugins: ['@tanstack/eslint-plugin-query'],
	settings: {
		'jsx-a11y': {
			polymorphicPropName: 'as',
		},
	},
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/no-multi-comp': 'off',
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.tsx'],
			},
		],

		'react-perf/jsx-no-new-function-as-prop': 'off',
		'react-perf/jsx-no-jsx-as-prop': 'off',

		'jsx-a11y/no-autofocus': 'off',

		'@tanstack/query/exhaustive-deps': 'error',
		'@tanstack/query/no-rest-destructuring': 'warn',
		'@tanstack/query/stable-query-client': 'error',
		'@tanstack/query/no-unstable-deps': 'error',
		'@tanstack/query/infinite-query-property-order': 'error',
		'@tanstack/query/no-void-query-fn': 'error',
		'@tanstack/query/mutation-property-order': 'error',
	},
});
