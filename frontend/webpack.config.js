const path = require('path');

module.exports = {
  mode: 'development', // or 'production' or 'none'
  entry: './src/index.js', // Your main entry point
  output: {
    path: path.resolve(__dirname, 'public'), // Output directory
    filename: 'bundle.js', // Output filename
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 10001,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Add presets here as well
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};