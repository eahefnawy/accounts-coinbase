Coinbase = {}; // global Meteor object

// https://developers.coinbase.com/api/v2#users
Coinbase.whitelistedFields = ['id', 'name', 'username', 'avatar_url'];

OAuth.registerService('coinbase', 2, null, function(query) {

  var response = getTokenResponse(query);
  var identity = getIdentity(response.accessToken);

  var serviceData = {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    expiresAt: (+new Date) + (1000 * response.expiresIn),
  };

  var fields = _.pick(identity, Coinbase.whitelistedFields);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {profile: {name: identity.name}},
  };
});

var getTokenResponse = function(query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'coinbase'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var responseContent;
  try {
    responseContent = HTTP.post(
      'https://api.coinbase.com/oauth/token', {
        params: {
          client_id: config.clientId,
          redirect_uri: OAuth._redirectUri('coinbase', config),
          client_secret: OAuth.openSecret(config.secret),
          code: query.code,
          grant_type: 'authorization_code'
        },
      }).data;
  } catch (err) {
    throw _.extend(new Error('Failed to complete OAuth handshake with Coinbase. ' + err.message),
                   {response: err.response});
  }

  return {
    accessToken: responseContent.access_token,
    refreshToken: responseContent.refresh_token,
    expiresIn: responseContent.expires_in,
  };
};

var getIdentity = function(accessToken) {
  try {
    return HTTP.get('https://api.coinbase.com/v2/user', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).data.data; // the response contains 'data' property as well
  } catch (err) {
    throw _.extend(new Error('Failed to fetch identity from Coinbase. ' + err.message),
                   {response: err.response});
  }
};

Coinbase.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
