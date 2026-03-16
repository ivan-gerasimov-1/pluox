import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { checker } from 'vite-plugin-checker';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';

// oxlint-disable import/no-default-export
export default defineConfig(({ mode }) => {
	const isDevelopment = mode === 'development';

	const env = loadEnv(mode, process.cwd(), '');
	const envPrefix = ['APP_'];

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

		resolve: {
			tsconfigPaths: true,
		},

		typescript: {
			configFile: isDevelopment ? './tsconfig.dev.json' : './tsconfig.json',
		},

		css: {
			modules: {
				localsConvention: 'camelCase',
			},
		},

		server: {
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

		build: {
			sourcemap: true,
			modulePreload: {
				polyfill: false,
			},
			outDir: 'build',
			rolldownOptions: {
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

						/** `id` is 'src/web' or 'apps/kit' */
						return 'web';
					},
				},
			},
		},
	};
});
