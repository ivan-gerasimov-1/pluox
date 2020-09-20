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
  paths: {
    entry: './src/index.ts',
    dist: path.resolve(__dirname, 'build'),
    public: path.resolve(__dirname, 'public'),
    indexHtmlTemplate: path.resolve(__dirname, 'src', 'index.html'),
    indexHtmlDist: path.resolve(__dirname, 'build', 'index.html'),
  },
};

let isDev = process.env.NODE_ENV === Mode.Development;

function identity(value) {
  return value;
}

/**
 * @param {string} [value]
 * @returns {boolean}
 */
function isBundleAnalyzerEnabled(value) {
  return value === 'on';
}

module.exports = {
  entry: config.paths.entry,
  mode: Mode.Development,
  devtool: isDev && 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [new TsConfigPathsPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    !isDev && new CopyPlugin({
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
    isBundleAnalyzerEnabled(process.env.BUNDLE_ANALYZER) &&
      new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
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
              hmr: isDev,
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
                localIdentName: isDev
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
      }
    ],
  },
  output: {
    path: config.paths.dist,
    filename: isDev ? '[name].[hash].js' : '[name].[chunkhash].js',
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
