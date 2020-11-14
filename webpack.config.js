const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'dist',
  },
  devServer: {
    /**
     * bundle.js is in memory, but will be served
     * from dist/bundle.js where ./index.html expects it
     */
    publicPath: '/dist/',
    // contentBase: path.join(__dirname, '.'),
    // compress: true,
    // port: 9000,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
