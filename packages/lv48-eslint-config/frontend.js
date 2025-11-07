import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluignHooks from 'eslint-plugin-react-hooks';

import { base, rules } from './base';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ['**/*.{js,ts,tsx}'],
		languageOptions: {
			globals: globals.browser,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	...base,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	pluignHooks.configs.flat['recommended-latest'],
	...pluginQuery.configs['flat/recommended'],
	rules,
];
