import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export const base = [pluginJs.configs.all, ...tseslint.configs.strict];

export const rules = {
	rules: {
		// ESLint All
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
		'consistent-return': 'off',
		'prefer-named-capture-group': 'off',
		'prefer-object-has-own': 'off',
		'sort-imports': 'off',
		'no-magic-numbers': [
			'off',
			{
				ignoreDefaultValues: true,
				ignoreArrayIndexes: true,
				ignoreClassFieldInitialValues: true,
				enforceConst: true,
			},
		],

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

		// TypeScript Strict
		'@typescript-eslint/no-empty-object-type': 'off',
		'@typescript-eslint/unified-signatures': 'off',
		'@typescript-eslint/no-extraneous-class': 'off',
		'@typescript-eslint/no-invalid-void-type': 'off',

		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/ban-ts-comment': [
			'warn',
			{
				minimumDescriptionLength: 3,
				'ts-check': false,
				'ts-expect-error': 'allow-with-description',
				'ts-ignore': true,
				'ts-nocheck': true,
			},
		],
	},
};
