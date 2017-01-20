/* eslint-disable */
require('app-module-path').addPath(__dirname);


const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const isomorphicConfig = require('./webpack/isomorphic.config');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
if (global.__DEVELOPMENT__) {
  if (!require('piping')({ hook: true, ignore: /(\/\.|~$|\.json|\.scss$)/i, })) {}
  require('./babel');
  require('app-module-path').addPath('./src');
}
else {
  require('app-module-path').addPath('./dist');
}
const serverPath = global.__DEVELOPMENT__ ? 'src' : 'dist';
global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)
  .server('./', () => {
    require(`./${serverPath}/server`)();
  });
