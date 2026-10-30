import path from 'path';

import { defineConfig } from 'vitest/config';

// oxlint-disable import/no-default-export
export default defineConfig({
	test: {
		include: [
			'src/**/*.{test,spec}.{ts,tsx}',
			'../core/src/**/*.{test,spec}.{ts,tsx}',
		],
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
