const appContext = require.context('./src', true, /^((?!(client|server|templates)).)*jsx?$/);

appContext.keys().forEach(appContext);

