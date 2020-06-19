const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  mode: 'production', // development | production
  entry: {
    main: './vendors/javascripts/scripts.js',
    vendors: './vendors/javascripts/toastify.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: 'vendors.bundle.js',
    path: path.resolve(__dirname, 'public/js')
  },
  devtool: 'inline-source-map'
}