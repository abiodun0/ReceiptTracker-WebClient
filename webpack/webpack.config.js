const path = require('path');
const { addPlugins, createConfig, defineConstants, env, entryPoint, setOutput, sourceMaps, performance, customConfig } = require('@webpack-blocks/webpack2');
const babel = require('@webpack-blocks/babel6');
const devServer = require('@webpack-blocks/dev-server2');
const cssModules = require('@webpack-blocks/css-modules');
const postcss = require('@webpack-blocks/postcss');
const sass = require('@webpack-blocks/sass');
const extractText = require('@webpack-blocks/extract-text2');
const plugins = require('./webpack.plugins');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';
const assetPath = isDev ? 'build' : 'static/dist';
const publicPath = isDev ? `http://localhost:${+process.env.PORT}/` : null; // this would change as soon as we have the proper config path setup
module.exports = createConfig([
  entryPoint({
    app: ['bootstrap-loader', './src/index', './src/client'],
  }),
  setOutput({
    path: path.resolve(__dirname, `../${assetPath}`),
    publicPath: `${publicPath}build/`,
    filename: 'bundle.js',
  }),
  babel(),
  cssModules(),
  postcss(),
  sass(),
  addPlugins(plugins.extraConfigs(isDev)),
  defineConstants({
    'process.env.NODE_ENV': nodeEnv,
  }),
  customConfig({
    resolve: {
      modules: [
        'src',
        'node_modules',
      ],
    },
  }),
  env('test', [
    customConfig({
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
      node: {
        fs: 'empty',
        net: 'empty',
      },
    }),
    performance({
      // Increase performance budget thresholds for test mode to avoid unnecssary webpack logs
      maxAssetSize: 22500000,
      maxEntrypointSize: 22500000,
    }),
  ]),
  env('development', [
    devServer({
      port: +process.env.PORT,
      inline: true,
      hot: true, // disabling open for now. till a viable solution is can be achieved
    }),
    sourceMaps(),
    performance({
      // Increase performance budget thresholds for development mode
      maxAssetSize: 1500000,
      maxEntrypointSize: 1500000,
    }),
    addPlugins(plugins.development),
  ]),
  env('production', [
    extractText('css/style.css', 'text/x-sass'), // hard coded literal ... i.e style.css will be change soon as soon as their is sample react component
    addPlugins(plugins.production),
  ]),
]);
