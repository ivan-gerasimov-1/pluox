import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export const base = [
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];

export const rules = {
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
};
