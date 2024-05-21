// @ts-check
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

class NodeEnvNotProvidedError extends Error {
	constructor() {
		super('NODE_ENV is not provided');
	}
}

class UnknownNodeEnvError extends Error {
	constructor() {
		super('Unknown NODE_ENV value');
	}
}

/** @enum {string} */
const EEnvironment = {
	DEVELOPMENT: 'development',
	PRODUCTION: 'production',
};

/** @enum {string} */
const EWebpackMode = {
	DEVELOPMENT: 'development',
	PRODUCTION: 'production',
};

const ENVIRONMENT = getNodeEnv();

let Loader = {
	CSS: 'css-loader',
	MiniCssExtract: MiniCssExtractPlugin.loader,
	SourceMap: 'source-map-loader',
	TS: 'ts-loader',
	PostCss: 'postcss-loader',
	Svgr: '@svgr/webpack',
};

let PostCssPlugin = {
	Nested: postcssNested,
	PresetEnv: postcssPresetEnv,
};

let Enforce = {
	Pre: 'pre',
};

let config = {
	nodeEnv: ENVIRONMENT,
	isDevelopment: isDevelopment(ENVIRONMENT),
	paths: {
		entry: './src/index.ts',
		src: path.resolve(__dirname, 'src'),
		dist: path.resolve(__dirname, 'build'),
		public: path.resolve(__dirname, 'public'),
		indexHtmlTemplate: path.resolve(__dirname, 'src', 'index.html'),
		indexHtmlDist: path.resolve(__dirname, 'build', 'index.html'),
	},
};

module.exports = {
	entry: config.paths.entry,
	mode: getWebpackMode(config.nodeEnv),
	devtool: config.isDevelopment && 'eval-cheap-module-source-map',
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		plugins: [new TsconfigPathsPlugin()],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.EnvironmentPlugin({
			NODE_ENV: getNodeEnv(),
		}),
		!config.isDevelopment &&
			new CopyPlugin({
				patterns: [
					{
						from: config.paths.public,
						to: config.paths.dist,
						globOptions: {
							dot: false,
						},
					},
				],
			}),
		new HtmlWebpackPlugin({
			template: config.paths.indexHtmlTemplate,
			filename: config.paths.indexHtmlDist,
			inject: 'body',
			scriptLoading: 'defer',
		}),
		isBundleAnalyzerEnabled() && new BundleAnalyzerPlugin(),
		new MiniCssExtractPlugin({
			filename: config.isDevelopment
				? '[name].css'
				: '[name].[contenthash].css',
			chunkFilename: config.isDevelopment
				? '[id].css'
				: '[id].[contenthash].css',
			ignoreOrder: true,
		}),
		config.isDevelopment && new ReactRefreshPlugin(),
	].filter(identity),
	module: {
		rules: [
			// TypeScript
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: Loader.TS,
						options: {
							configFile: config.isDevelopment
								? path.resolve(__dirname, 'tsconfig.dev.json')
								: path.resolve(__dirname, 'tsconfig.json'),
							getCustomTransformers: () => ({
								before: [
									config.isDevelopment && ReactRefreshTypeScript(),
								].filter(Boolean),
							}),
						},
					},
				],
			},
			{
				enforce: Enforce.Pre,
				test: /\.js$/,
				loader: Loader.SourceMap,
			},

			// Styles
			{
				test: /\.css$/,
				use: [
					Loader.MiniCssExtract,
					{
						loader: Loader.CSS,
						options: {
							sourceMap: true,
							importLoaders: 1,
							modules: {
								auto: true,
								namedExport: false,
								exportLocalsConvention: 'camel-case-only',
								localIdentName: config.isDevelopment
									? '[local]_[name]_[contenthash:base64:5]'
									: '[contenthash:base64:5]',
							},
						},
					},
					{
						loader: Loader.PostCss,
						options: {
							sourceMap: true,
							postcssOptions: {
								plugins: [PostCssPlugin.PresetEnv(), PostCssPlugin.Nested()],
							},
						},
					},
				],
			},

			// SVG
			{
				test: /\.svg$/,
				use: [Loader.Svgr],
			},
		],
	},
	output: {
		path: config.paths.dist,
		filename: config.isDevelopment
			? '[name].[contenthash].js'
			: '[name].[chunkhash].js',
		publicPath: '/',
	},
	externals: {
		moment: 'moment',
	},
	optimization: {
		moduleIds: 'deterministic',
		splitChunks: {
			chunks: 'all',
		},
		minimizer: ['...', new CssMinimizerPlugin()],
	},
	stats: {
		preset: 'minimal',
		version: false,
		warnings: true,
	},
	devServer: {
		port: 3000,
		compress: true,
		hot: true,
		historyApiFallback: true,
		static: {
			directory: config.paths.public,
		},
		proxy: [
			{
				context: ['/api'],
				target: 'http://localhost:3001',
				pathRewrite: {
					'^/api': '',
				},
			},
		],
	},
};

/**
 * @param {EEnvironment} nodeEnv
 * @returns {boolean}
 */
function isDevelopment(nodeEnv) {
	return nodeEnv === EEnvironment.DEVELOPMENT;
}

/**
 * @param {T} value
 * @returns {T}
 */
function identity(value) {
	return value;
}

/**
 * @returns {boolean}
 */
function isBundleAnalyzerEnabled() {
	return process.env.BUNDLE_ANALYZER === 'on';
}

/**
 * @returns {EEnvironment}
 * @throws {NodeEnvNotProvidedError | UnknownNodeEnvError}
 */
function getNodeEnv() {
	if (!process.env.NODE_ENV) {
		throw new NodeEnvNotProvidedError();
	}

	const isValidNodeEnv = Object.values(EEnvironment).includes(
		process.env.NODE_ENV,
	);

	if (!isValidNodeEnv) {
		throw new UnknownNodeEnvError();
	}

	return process.env.NODE_ENV;
}

/**
 * @param {EEnvironment} nodeEnv
 * @returns {EWebpackMode}
 * @throws {NodeEnvNotProvidedError}
 */
function getWebpackMode(nodeEnv) {
	switch (nodeEnv) {
		case EEnvironment.DEVELOPMENT: {
			return EWebpackMode.DEVELOPMENT;
		}
		case EEnvironment.PRODUCTION: {
			return EWebpackMode.PRODUCTION;
		}
		default:
			throw new UnknownNodeEnvError();
	}
}
