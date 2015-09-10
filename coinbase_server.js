Coinbase = {};

var querystring = Npm.require('querystring');

OAuth.registerService('coinbase', 2, null, function(query) {

  var response = getTokenResponse(query);
  var accessToken = response.accessToken;
  var refreshToken = response.refreshToken;
  var identity = getIdentity(accessToken);

  var serviceData = {
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresAt: (+new Date) + (1000 * response.expiresIn)
  };


  return {
    serviceData: serviceData,
    options: {profile: {name: identity.name}}
  };
});



var getTokenResponse = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'coinbase'});
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var responseContent;
  try {
    // Request an access token
    responseContent = HTTP.get(
      "http://www.coinbase.com/oauth/token", {
        params: {
          client_id: config.client_id,
          redirect_uri: OAuth._redirectUri('coinbase', config),
          client_secret: OAuth.openSecret(config.client_secret),
          code: query.code,
          grant_type: 'authorization_code'
        }
      }).content;
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Coinbase. " + err.message),
                   {response: err.response});
  }


  var parsedResponse = querystring.parse(responseContent);
  var coinbaseAccessToken = parsedResponse.access_token;
  var coinbaseRefreshToken = parsedResponse.refresh_token;
  var coinbaseExpires = parsedResponse.expires;

  return {
    accessToken: coinbaseAccessToken,
    refreshToken: coinbaseRefreshToken,
    expiresIn: coinbaseExpires
  };
};

var getIdentity = function (accessToken) {
  try {
    return HTTP.get("https://api.coinbase.com/v2/user", {
      params: {
        access_token: accessToken
      }
    }).data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Coinbase. " + err.message),
                   {response: err.response});
  }
};

Coinbase.retrieveCredential = function(credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
