Package.describe({
  summary: "Coinbase OAuth flow",
  version: "0.0.1"
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

  api.addFiles(
    ['coinbase_configure.html', 'coinbase_configure.js'],
    'client');

  api.addFiles('coinbase_server.js', 'server');
  api.addFiles('coinbase_client.js', 'client');
});
