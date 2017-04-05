var webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

module.exports = {

  profile: true,
  devtool: false,
  entry: {
    'app': './dist/unbundled-aot/src/main.aot.js'
  },
  output: {
    path: __dirname + "/dist/aot",
    filename: "[name].js",
    publicPath: "dist/"
  },
  resolve: {
    extensions: [/*'.ts',*/ '.js', '.jpg', '.jpeg', '.gif', '.png', '.css', '.html']
  },
  module: {
    loaders: [
      { test: /\.(jpg|jpeg|gif|png)$/, loader:'file-loader?name=img/[path][name].[ext]' },
      { test: /\.(eof|woff|woff2|svg)$/, loader:'file-loader?name=img/[path][name].[ext]' },
      { test: /\.css$/, loader:'raw-loader' },
      { test: /\.html$/,  loaders: ['html-loader'] }
    ],
    exprContextCritical: false
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  node: {
    __filename: true
  },
  devServer: {
    inline:true,
    port: 8080,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }

};
