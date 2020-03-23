const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: {
    main: resolve(__dirname, "../src"),
    vendor: [
      "react",
      "react-dom",
      "react-redux",
      "react-router-dom",
      "redux",
      "redux-thunk",
      "emotion"
    ]
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [resolve(__dirname, "../src")],
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new Dotenv({
      path: "src/config/.env"
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Southland Office",
      template: "webpack/template.html"
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      as: "script",
      include: "all"
    }),
    new OfflinePlugin({
      ServiceWorker: {
        navigateFallbackURL: "/"
      },
      AppCache: false
    })
  ]
};
