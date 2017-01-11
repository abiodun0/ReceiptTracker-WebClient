const webpackConfig = require('./webpack/webpack.config.js');

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'], // run in Chrome
    singleRun: true, // just run once by default
    frameworks: ['mocha', 'chai-sinon'], // use the mocha test framework
    files: [
      'tests.webpack.js', // Test files
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'], // preprocess with webpack and our sourcemap loader
    },
    reporters: ['mocha', 'coverage'], // report results in this format
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
    },
  });
};
