import { defineConfig } from 'oxlint';

export const base = defineConfig({
	categories: {
		correctness: 'error',
		nursery: 'warn',
		pedantic: 'warn',
		perf: 'warn',
		restriction: 'warn',
		/** @todo Enable style rules */
		// style: 'warn',
		suspicious: 'warn',
	},
	env: {
		builtin: true,
	},
	plugins: ['typescript', 'oxc', 'promise', 'import', 'eslint', 'vitest'],
	rules: {
		'oxc/no-optional-chaining': 'off',
		'oxc/no-rest-spread-properties': 'off',
		'oxc/no-async-await': 'off',

		'eslint/require-await': 'off',
		'eslint/max-lines-per-function': 'off',
		'eslint/max-classes-per-file': 'off',
		'eslint/no-use-before-define': 'off',
		'eslint/max-lines': 'off',
		/** @todo Consider re-evaluation of rules below */
		'eslint/no-undef': 'off',
		'eslint/no-undefined': 'off',
		'eslint/no-inline-comments': 'off',
		'eslint/no-useless-constructor': 'off',

		'typescript/no-floating-promises': 'off',
		'typescript/restrict-template-expressions': 'off',
		'typescript/prefer-readonly-parameter-types': 'off',
		'typescript/strict-void-return': 'off',
		'typescript/no-confusing-void-expression': 'off',
		'typescript/require-await': 'off',
		'typescript/no-misused-promises': 'off',
		'typescript/no-deprecated': 'off',
		'typescript/promise-function-async': 'off',
		'typescript/explicit-function-return-type': 'off',
		'typescript/class-methods-use-this': 'off',
		'typescript/explicit-module-boundary-types': 'off',
		'typescript/no-empty-object-type': 'off',
		'typescript/no-extraneous-class': 'off',
		/** @todo Consider re-evaluation of rules below */
		'typescript/ban-types': 'off',
		'typescript/unbound-method': 'off',

		'import/max-dependencies': 'off',
		'import/prefer-default-export': 'off',
	},
});
