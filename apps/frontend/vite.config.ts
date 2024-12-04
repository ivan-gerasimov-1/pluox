import path from 'path';

import { defineConfig, loadEnv } from 'vite';

import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
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
		},

		resolve: {
			alias: {
				'@domain': path.resolve(__dirname, './src/core/domain'),
				'@core': path.resolve(__dirname, './src/core'),
				'@components': path.resolve(__dirname, './src/components'),
				'@modules': path.resolve(__dirname, './src/modules'),
				'@screens': path.resolve(__dirname, './src/screens'),
				'@uiKit': path.resolve(__dirname, './src/uiKit'),
				'@utils': path.resolve(__dirname, './src/utils'),
				'@root': path.resolve(__dirname, './src'),
			},
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
				plugins: [postcssNested(), postcssPresetEnv()],
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
					target: 'http://localhost:3001',
					changeOrigin: true,
				},
			},
		},

		preview: {
			port: 3001,
			host: true,
		},

		build: {
			target: 'es2021',
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
					},
				},
			},
		},
	};
});
