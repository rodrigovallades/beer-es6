const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'app/assets/scripts/app.js'),
  output: {
    path: path.resolve(__dirname, 'app/temp/scripts'),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.js[x]$/,
        loader: "babel-loader",
        options: { presets: ['es2015'] }
      }
    ]
  }
}
