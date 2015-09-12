Coinbase = {}; // global Meteor object

Coinbase.requestCredential = function(options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'coinbase'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();

  var scope = undefined;
  if (options && options.requestPermissions)
    scope = options.requestPermissions.join(',');

  var loginStyle = OAuth._loginStyle('coinbase', config, options);

  var loginUrl = 'https://www.coinbase.com/oauth/authorize?response_type=code' +
        '&client_id=' + config.clientId +
        '&redirect_uri=' + OAuth._redirectUri('coinbase', config) +
        '&state=' + OAuth._stateParam(loginStyle, credentialToken);
  if (scope)
    loginUrl = loginUrl + '&scope=' + scope;

  OAuth.launchLogin({
    loginService: 'coinbase',
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
  });
};
