accounts-coinbase
=================
:moneybag: `loginWithCoinbase` Meteor Package. Updated & fully working at September 2015, since all the other `accounts-coinbase` are outdated. Add the package with:- 

```
meteor add eahefnawy:accounts-coinbase
```

## Usage

### 1. [Create Coinbase OAuth2 Application](https://www.coinbase.com/oauth/applications/new).
For the "Permitted Redirect URIs" text field, add the following URIs:

```
http://localhost:3000/_oauth/coinbase
http://localhost:3000/_oauth/coinbase?close
ANY_DOMAIN.com/_oauth/coinbase
ANY_DOMAIN.com/_oauth/coinbase?close
you get the idea ;)
```
 
After you click "create", you should get a client key and secret. Moving on...

### 2. Configure Your Meteor Application
Copy/fill the following code into a file inside the server directory of your app:
```
Meteor.startup(function() {
  ServiceConfiguration.configurations.upsert(
    { service: 'coinbase' },
    {
      $set: {
        clientId: <COINBASE_ID>,
        secret: <COINBASE_SECRET>,
      },
    }
  );
});
```

### 3. Have Fun!
You can now simply call the method on the client side, and it should work ;)
```
Meteor.loginWithCoinbase(function(err) {
  console.log('yaay!')
});
```
You now have a user object logged in with Coinbase! You can log him out as usual if you want to with `Meteor.logout()`. 
