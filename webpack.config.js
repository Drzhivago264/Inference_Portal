const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './frontend/index.js',  
  output: {
    filename: 'index-bundle.js',  
    chunkFilename: "[id]-[chunkhash].js",
    path: path.resolve(__dirname, './static'),  
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]

      },
      {
        test: /\.(eot|md|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ]

};


