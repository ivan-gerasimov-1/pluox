import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import tsconfigPaths from 'vite-tsconfig-paths';
import { analyzer } from 'vite-bundle-analyzer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { checker } from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const envPrefix = ['APP_'];
	const isDevelopment = mode === 'development';

	if (isDevelopment) {
		envPrefix.push('DEV_');
	}

	const plugins = [
		react(),
		svgr({
			svgrOptions: {
				icon: true,
				exportType: 'default',
				ref: true,
				svgo: true,
				titleProp: true,
			},
			include: ['**/*.svg'],
		}),
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
			root: './',
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
					rewrite: (path) => path.replace(/^\/api/, ''),
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
						if (id.includes('node_modules')) {
							return 'vendors';
						}

						if (id.includes('/core')) {
							return 'core';
						}

						if (id.includes('/presentation')) {
							return 'ui';
						}
					},
				},
			},
		},
	};
});
