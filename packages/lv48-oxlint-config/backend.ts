import { defineConfig } from 'oxlint';

import { base } from './base.ts';
import { types } from './types.ts';

export const backend = defineConfig({
	extends: [base, types],
	env: {
		es2024: true,
		node: true,
	},
});
