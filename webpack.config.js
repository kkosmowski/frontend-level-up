const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, 'docs'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                cssnano({
                  preset: 'default',
                }),
                autoprefixer({}),
              ],
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp|gif|ico)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    // new BrowserSyncPlugin({
    //     host: "localhost",
    //     port: 8000,
    //     proxy: "http://localhost/",
    // },
    // {
    //     reload: true
    // }),
  ],
};
