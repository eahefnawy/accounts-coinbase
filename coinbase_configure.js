Template.configureLoginServiceDialogForCoinbase.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForCoinbase.fields = function () {
  return [
    {property: 'appId', label: 'App ID'},
    {property: 'secret', label: 'App Secret'}
  ];
};
