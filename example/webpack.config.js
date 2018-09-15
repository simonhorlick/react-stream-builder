var path = require('path');

var config = {
  /*
   * List all entry points to applications here. Webpack will recursively go
   * through every "require" statement in efficiently build out the
   * application's dependency tree.
   */
  entry: {
    app: './counter.tsx',
  },

  /*
   * The combination of path and filename tells Webpack what name to give to
   * the final bundled JavaScript file and where to store this file.
   */
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: '[name].bundle.js',
  },

  /*
   * resolve lets Webpack now in advance what file extensions you plan on
   * "require"ing into the web application, and allows you to drop them
   * in your code.
   */
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'] },

  devtool: 'source-map',

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ]
  },
};

module.exports = config;
