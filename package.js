Package.describe({
  name: 'eahefnawy:accounts-coinbase',
  summary: 'A Meteor loginWithCoinbase Functionality.',
  version: '0.0.1',
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
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);

  api.export('Coinbase');

  api.addFiles('coinbase_server.js', 'server');
  api.addFiles('coinbase_client.js', 'client');
  api.addFiles('coinbase.js');
});
