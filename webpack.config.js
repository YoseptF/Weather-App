const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: [
    path.resolve('src', 'index.js'),
    // path.resolve('src', 'packages', 'countries.js'),
  ],
  output: {
    path: path.resolve('dist'),
    filename: '[name].[contenthash].js',
    // chunkFilename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Restaurant Page',
      favicon: './src/images/favicon.ico',
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['*.*.js'],
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] },
    }),
    new Dotenv({
      systemvars: true,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
