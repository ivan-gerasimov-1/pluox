import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

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
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	{
		rules: {
			'prefer-const': 'off',
			'no-case-declarations': 'off',

			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',

			/** @todo Fix warnings and remove overrides*/
			'no-constant-condition': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
		},
	},
];
