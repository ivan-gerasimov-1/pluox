import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import { defineConfig, loadEnv } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { checker } from 'vite-plugin-checker';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const envPrefix = ['APP_'];
	const isDevelopment = mode === 'development';

	if (isDevelopment) {
		envPrefix.push('DEV_');
	}

	const plugins = [
		react(),
		tailwindcss(),
		createHtmlPlugin({
			minify: !isDevelopment,
		}),
		checker({
			typescript: true,
			overlay: {
				initialIsOpen: true,
			},
			enableBuild: true,
		}),
		tsconfigPaths({
			projects: [
				'./',
				/** @pluox/core */
				'../core/',
			],
		}),
		VitePWA({
			manifest: false,
		}),
	];

	if (env.DEV_BUNDLE_ANALYZER === 'on') {
		plugins.push(analyzer());
	}

	return {
		plugins,
		envPrefix,

		optimizeDeps: {
			esbuildOptions: {
				target: 'es2021',
			},
		},

		typescript: {
			configFile: isDevelopment ? './tsconfig.dev.json' : './tsconfig.json',
		},

		css: {
			modules: {
				localsConvention: 'camelCase',
			},
			postcss: {
				plugins: [
					postcssNested(),
					postcssPresetEnv({
						env: mode,
					}),
				],
			},
		},

		server: {
			port: 3000,
			host: true,
			overlay: {
				errors: true,
				warnings: false,
			},
			proxy: {
				'/api': {
					target: 'http://localhost:8787',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/u, ''),
				},
			},
		},

		preview: {
			port: 3001,
			host: true,
		},

		build: {
			sourcemap: true,
			cssMinify: 'lightningcss',
			modulePreload: {
				polyfill: false,
			},
			outDir: 'build',
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (
							id.includes('node_modules/@sentry') ||
							id.includes('node_modules/@sentry-internal')
						) {
							return 'sentry';
						}

						if (id.includes('node_modules')) {
							return 'vendors';
						}

						if (id.includes('apps/core')) {
							return 'core';
						}

						if (id.includes('src/web')) {
							return 'web';
						}
					},
				},
			},
		},
	};
});
