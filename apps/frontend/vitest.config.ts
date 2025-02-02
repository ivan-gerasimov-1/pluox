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

			'@core': path.resolve(__dirname, './src/core'),
			'@domain': path.resolve(__dirname, './src/core/domain'),
			'@modules': path.resolve(__dirname, './src/modules'),
			'@utils': path.resolve(__dirname, './src/presentation/web-ui/utils'),

			'@components': path.resolve(
				__dirname,
				'./src/presentation/web-ui/components',
			),
			'@screens': path.resolve(__dirname, './src/screens'),
			'@uiKit': path.resolve(__dirname, './presentation/web-ui/uiKit'),

			'@web': path.resolve(__dirname, './presentation/web-ui'),
		},
	},
});
