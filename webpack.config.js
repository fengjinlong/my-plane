const path = require('path')
module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, './dist')
  },
  devServer: {
    // static: {
    contentBase: path.join(__dirname, 'dist'),
    // },
    compress: true,
    port: 9000
  },
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif)/i,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: "assets/",
          publicPath: '',
        }
      }]
    }]
  }
}