import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export const base = [pluginJs.configs.all, ...tseslint.configs.recommended];

export const rules = {
	rules: {
		// ESLint
		// off
		'arrow-body-style': 'off',
		'capitalized-comments': 'off',
		'class-methods-use-this': 'off',
		'init-declarations': 'off',
		'max-classes-per-file': 'off',
		'max-lines-per-function': 'off',
		'max-lines': 'off',
		'max-params': 'off',
		'max-statements': 'off',
		'no-continue': 'off',
		'no-inline-comments': 'off',
		'no-ternary': 'off',
		'no-undefined': 'off',
		'no-use-before-define': 'off',
		'one-var': 'off',
		'prefer-const': 'off',
		'prefer-destructuring': 'off',
		'require-await': 'off',
		'sort-keys': 'off',
		'prefer-promise-reject-errors': 'off',

		// off, to verify
		'sort-imports': 'off',
		'consistent-return': 'off',
		'no-magic-numbers': [
			'off',
			{
				ignoreDefaultValues: true,
				ignoreArrayIndexes: true,
				ignoreClassFieldInitialValues: true,
				enforceConst: true,
			},
		],
		'prefer-object-has-own': 'off',
		'prefer-named-capture-group': 'off',

		// warn
		'func-names': 'warn',
		'func-style': ['warn', 'declaration'],
		'grouped-accessor-pairs': 'warn',
		'no-alert': 'warn',
		'no-console': 'warn',
		'no-duplicate-imports': 'warn',
		'no-implicit-coercion': 'warn',
		'no-negated-condition': 'warn',
		'no-plusplus': 'warn',
		'no-shadow': 'warn',
		'no-underscore-dangle': 'warn',
		'no-useless-constructor': 'warn',
		'no-useless-return': 'warn',
		'no-void': 'warn',
		'prefer-regex-literals': 'warn',
		'no-empty-function': [
			'warn',
			{
				allow: ['constructors'],
			},
		],
		'id-length': [
			'warn',
			{
				exceptions: ['_'],
			},
		],

		// error
		'guard-for-in': 'error',
		'require-unicode-regexp': 'error',
		radix: 'error',
		'new-cap': [
			'error',
			{
				newIsCapExceptionPattern: '\\.useClass$',
			},
		],

		// TypeScript
		'@typescript-eslint/no-empty-object-type': 'off',

		'@typescript-eslint/ban-ts-comment': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
	},
};
