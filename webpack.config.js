const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const EEnvironment = {
	DEVELOPMENT: 'development',
};

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

let Mode = {
	Development: 'development',
	Production: 'production',
};

let Enforce = {
	Pre: 'pre',
};

let config = {
	isDevelopment: isDevelopment(),
	paths: {
		entry: './src/index.ts',
		dist: path.resolve(__dirname, 'build'),
		public: path.resolve(__dirname, 'public'),
		indexHtmlTemplate: path.resolve(__dirname, 'src', 'index.html'),
		indexHtmlDist: path.resolve(__dirname, 'build', 'index.html'),
	},
};

function identity(value) {
	return value;
}

/**
 * @returns {boolean}
 */
function isBundleAnalyzerEnabled() {
	return process.env.BUNDLE_ANALYZER === 'on';
}

module.exports = {
	entry: config.paths.entry,
	mode: Mode.Development,
	devtool: config.isDevelopment && 'eval-cheap-module-source-map',
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
		plugins: [new TsConfigPathsPlugin()],
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
					{
						loader: Loader.MiniCssExtract,
						options: {
							hmr: config.isDevelopment,
							reloadAll: true,
						},
					},
					{
						loader: Loader.CSS,
						options: {
							sourceMap: true,
							importLoaders: 1,
							modules: {
								auto: true,
								localIdentName: config.isDevelopment
									? '[name]__[local]--[hash:base64:5]'
									: undefined,
							},
						},
					},
					{
						loader: Loader.PostCss,
						options: {
							plugins: [PostCssPlugin.PresetEnv(), PostCssPlugin.Nested()],
							sourceMap: true,
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
			? '[name].[hash].js'
			: '[name].[chunkhash].js',
		publicPath: '/',
	},
	externals: {
		moment: 'moment',
	},
	optimization: {
		moduleIds: 'hashed',
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
		},
	},
	devServer: {
		overlay: {
			errors: true,
		},
		// host: '192.168.0.10',
		disableHostCheck: true,
		// useLocalIp: true,
		port: 3002,
		hot: true,
		hotOnly: true,
		historyApiFallback: true,
		compress: true,
		contentBase: config.paths.public,
		watchOptions: {
			aggregateTimeout: 500,
			ignored: /node_modules/,
		},
	},
};

function isDevelopment() {
	const nodeEnv = getNodeEnv();

	return nodeEnv === EEnvironment.DEVELOPMENT;
}

/**
 * @throws NodeEnvNotProvidedError
 */
function getNodeEnv() {
	if (!process.env.NODE_ENV) {
		throw new NodeEnvNotProvidedError();
	}

	return process.env.NODE_ENV;
}

class NodeEnvNotProvidedError extends Error {
	constructor() {
		super('NODE_ENV is not provided');
	}
}
