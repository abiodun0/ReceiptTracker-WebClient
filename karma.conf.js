const webpackConfig = require('./webpack/webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'], // run in Chrome
    singleRun: true, // just run once by default
    frameworks: ['mocha'], // use the mocha test framework
    files: [
      'tests.webpack.js', // just load this file
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'], // preprocess with webpack and our sourcemap loader
    },
    reporters: ['mocha'], // report results in this format
    webpack: webpackConfig,
  });
};
