const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = [
  // Node
  {
    mode: 'development',
    target: 'node',
    entry: {
      index: './src/index.ts',
      preview: './src/preview/start.ts',
      stats: './src/stats/index.ts',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
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
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /canvas/,
        contextRegExp: /jsdom/,
      }),
    ],
    externals: [nodeExternals()],
  },
  // Client
  {
    mode: 'development',
    target: 'web',
    entry: {
      commands: './src/preview/commands.tsx',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: '*.html', to: '.', context: 'src/preview' }],
      }),
    ],
  },
];
