import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import svgr from 'vite-plugin-svgr';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { checker } from 'vite-plugin-checker';
// import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const appEnv = loadEnv(mode, process.cwd(), ['APP', 'DEV']);
	const isDevelopment = mode === 'development';

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
		tsconfigPaths(),
		legacy({
			modernTargets: '>1%, last 2 versions, not dead',
			targets: '>0.3%, iOS >= 12, not dead',
			additionalLegacyPolyfills: [
				'@formatjs/intl-getcanonicallocales/polyfill',
				'@formatjs/intl-locale/polyfill',
				'@formatjs/intl-pluralrules/polyfill',
				'@formatjs/intl-pluralrules/locale-data/en',
				'@formatjs/intl-pluralrules/locale-data/ru',
				'@formatjs/intl-numberformat/polyfill',
				'@formatjs/intl-numberformat/locale-data/en',
				'@formatjs/intl-numberformat/locale-data/ru',
			],
		}),
		// VitePWA({
		// 	registerType: 'autoUpdate',
		// }),
	];

	if (env.BUNDLE_ANALYZER === 'on') {
		plugins.push(
			visualizer({
				open: true,
				filename: 'node_modules/.cache/bundle-analysis.html',
			}),
		);
	}

	return {
		plugins,

		define: {
			'process.env.NODE_ENV': JSON.stringify(mode),
			'process.env.APP_API_URL': JSON.stringify(appEnv.APP_API_URL),
			'process.env.APP_OPEN_EXCHANGE_RATES_API_URL': JSON.stringify(
				appEnv.APP_OPEN_EXCHANGE_RATES_API_URL,
			),
			'process.env.APP_OPEN_EXCHANGE_RATES_API_KEY': JSON.stringify(
				appEnv.APP_OPEN_EXCHANGE_RATES_API_KEY,
			),

			/** Development */
			'process.env.DEV_REACT_SCAN': JSON.stringify(appEnv.DEV_REACT_SCAN),
		},

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
