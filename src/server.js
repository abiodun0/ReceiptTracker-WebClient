/* eslint react/jsx-filename-extension: 0*/
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Html from './helpers/Html';
import { App } from './containers';

const app = express();
app.set('views', `${__dirname}/templates`);
app.set('view engine', 'ejs');

// This should be the default route for testing html template
// before being converted to react compoonent
app.get('/templates/:templateName', (req, res) => {
  const templateName = req.params.templateName;
  res.render(templateName, { title: 'Hey', assets: webpackIsomorphicTools.assets() });
});

// Wild card route for the default react component
app.get('*', (req, res) => {
  const sampleComponent = (<App />);
  res.status(200).send(`<!doctype html>\n${
  renderToString(<Html assets={webpackIsomorphicTools.assets()} component={sampleComponent} />)}`);
});

const port = process.env.PORT || 8000;

export default () => app.listen(port, () => {
  console.info(`==> 🌎  ENV=${process.env.NODE_ENV}`);
  console.info(`==> ✅  Front-end server is listening at http://localhost:${port}`);
});
