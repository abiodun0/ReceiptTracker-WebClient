const { webpack } = require('@webpack-blocks/webpack2');
const autoprefixer = require('autoprefixer');
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const isoConfig = require('./isomorphic.config');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

const webpackIsomorphicToolsPlugin = new IsomorphicPlugin(isoConfig);
exports.extraConfigs = isDev => [
  new webpack.LoaderOptionsPlugin({
    minimize: !isDev,
    debug: isDev,
    options: {
      context: __dirname,
      output: { path: './' }, // This has to be './' and not your output folder.
      postcss() {
        return [
          postcssFlexbugsFixes,
          autoprefixer({
            browsers: [
              '>1%',
              'last 4 versions',
              'Firefox ESR',
              'not ie < 10',
            ],
          }),
        ];
      },
    },
  }),
];
exports.development = [
  new DashboardPlugin({ minimal: true }),
  webpackIsomorphicToolsPlugin.development(),
];
exports.production = [
  webpackIsomorphicToolsPlugin,
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
    sourceMap: false,
  }),
];
