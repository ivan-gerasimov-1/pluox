import globals from 'globals';

import { base, rules } from './base';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,ts,tsx}'],
		languageOptions: {
			globals: globals.node,
		},
	},
	...base,
	rules,
];
