import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		coverage: {
			provider: 'v8',
			reporter: ['html'],
			include: ['src/**/*.ts'],
			exclude: ['**/*.test.ts'],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@core': path.resolve(__dirname, '../core/src'),
			'@kit': path.resolve(__dirname, '../kit/src'),
		},
	},
});
