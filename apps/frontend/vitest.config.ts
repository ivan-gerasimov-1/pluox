/// <reference types="vitest" />
import path from 'path';

import { defineConfig } from 'vite';

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
			'@root': path.resolve(__dirname, './src'),
		},
	},
});
