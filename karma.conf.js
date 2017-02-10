const webpackConfig = require('./webpack/webpack.config.js');

module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'], // run in Chrome
    singleRun: false, // just run once by default
    frameworks: ['mocha', 'chai-sinon'], // use the mocha test framework
    files: [
      'tests.webpack.js', // Test files
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap', 'coverage'], // preprocess with webpack and our sourcemap loader
    },
    reporters: ['mocha', 'coverage-istanbul'], // report results in this format
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true,
    },
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary', 'lcov'],
      dir: './coverage', // output directory
      fixWebpackSourcePaths: true,
    },
  });
};
