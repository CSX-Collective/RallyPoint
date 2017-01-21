const webpack = require('webpack');
const path = require('path');

const PATHS = {
  app: './src/client/index.jsx',
  html: './src/client/index.html',
  dist: path.join(__dirname, 'dist'),
};

module.exports = {
  entry: {
    javascript: PATHS.app,
    html: PATHS.html,
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    devServer: {
      proxy: {
        '**': {
          target: 'http://localhost:3000',
          secure: false,
        },
      },
    },
    contentBase: PATHS.dist,
  },
  eslint: {
    emitWarning: true,
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html',
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    }, {
      test: /\.(css|scss)$/,
      loaders: ['style', 'css', 'sass'],
    }],
  },
  externals: {
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'html', 'css', 'scss'],
  },
};
