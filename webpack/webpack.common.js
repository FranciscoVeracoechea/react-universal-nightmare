const path = require('path');
const sass = require('sass');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = (isDev, type) => ({
  mode: isDev ? 'development' : 'production',
  cache: !isDev,
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          (!isDev || type === 'server') ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]',
            },
          }, {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf|otf|fnt)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:10].[ext]',
          ...(isDev ? {} : {
            path: path.resolve(__dirname, '..', 'public/images'),
            outputPath: '/images',
            publicPath: '/images/',
          }),
        },
      },
      {
        test: /\.(ico)$/,
        loader: 'file-loader',
        options: {
          name: 'favicon.[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.css',
    ],
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src/client'),
      path.resolve(__dirname, '../src/server'),
    ],
  },
  devtool: isDev ? 'eval-source-map' : 'none',
});
