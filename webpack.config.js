// webpack.config.js
module.exports = {
  devtool: false, // Disable source maps

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/@mediapipe\/tasks-vision/,
      },
    ],
  },
};