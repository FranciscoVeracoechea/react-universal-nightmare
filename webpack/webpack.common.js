const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = (isDev, type) => ({
  mode: isDev ? 'development' : 'production',
  cache: !isDev,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
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
          (!isDev || type === 'server')
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader?modules=true&localIdentName=[name]__[local]',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf|otf|fnt)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:10].[ext]',
          ...(isDev ? {} : {
            path: path.resolve(__dirname, '..', 'public/media'),
            outputPath: '/media',
            publicPath: '/media/',
          }),
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
  devtool: 'eval-source-map',
});
