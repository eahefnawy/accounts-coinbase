Package.describe({
  summary: 'Login with Coinbase',
  version: '0.0.2',
  git: 'https://github.com/eahefnawy/accounts-coinbase.git',
});

Package.onUse(function(api) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use('templating', 'client');
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.export('Coinbase');

  api.addFiles('coinbase_server.js', 'server');
  api.addFiles('coinbase_client.js', 'client');
  api.addFiles('facebook.js');
});
