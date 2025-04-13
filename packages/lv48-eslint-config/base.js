import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export const base = [
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];

export const rules = {
	rules: {
		'prefer-const': 'off',
		'@typescript-eslint/no-empty-object-type': 'off',

		'@typescript-eslint/ban-ts-comment': 'warn',
	},
};
