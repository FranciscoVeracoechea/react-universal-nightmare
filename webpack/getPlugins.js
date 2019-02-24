// dependencies
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (isDev) => {
  const plugins = [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ];
  if (isDev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
    );
  }
  return plugins;
};
