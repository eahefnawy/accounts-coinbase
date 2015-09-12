Accounts.oauth.registerService('coinbase');

if (Meteor.isClient) {
  Meteor.loginWithCoinbase = function(options, callback) {
    if (!callback && typeof options === 'function') {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Coinbase.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    forLoggedInUser: [
      'services.coinbase.id', 'services.coinbase.username', 'services.coinbase.name', 'services.coinbase.avatar_url',
    ],
    forOtherUsers: [
      'services.coinbase.id', 'services.coinbase.username', 'services.coinbase.name', 'services.coinbase.avatar_url',
    ],
  });
}
