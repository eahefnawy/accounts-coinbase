Package.describe({
  name: 'eahefnawy:accounts-coinbase',
  summary: 'A Meteor loginWithCoinbase Functionality.',
  version: '0.0.1-plugins.0',
  git: 'https://github.com/eahefnawy/accounts-coinbase.git',
});

Package.onUse(function(api) {
  api.use('oauth2@1.1.3', ['client', 'server']);
  api.use('oauth@1.1.4', ['client', 'server']);
  api.use('http@1.1.0', ['server']);
  api.use('underscore@1.0.3', 'server');
  api.use('random@1.0.3', 'client');
  api.use('service-configuration@1.0.4', ['client', 'server']);
  api.use('accounts-base@1.2.0', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth@1.1.5', ['client', 'server']);

  api.export('Coinbase');

  api.addFiles('coinbase_server.js', 'server');
  api.addFiles('coinbase_client.js', 'client');
  api.addFiles('coinbase.js');
});
