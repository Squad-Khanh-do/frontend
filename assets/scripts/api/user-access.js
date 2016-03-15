'use strict';

let uiSurveyActions = require('../ui/survey');
let uiSignActions = require('../ui/sign-actions');
let myApp = require('../myApp');

let signUp = function (e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: myApp.baseUrl + '/sign-up',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  })
  .done(function(data) {
    console.log(data);
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let signIn = function (e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: myApp.baseUrl + '/sign-in',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  })
  .done(uiSignActions.inSuccess)
  .fail(function(err) {
    console.error(err);
  });
};

let signOut = function (e) {
  e.preventDefault();
  $.ajax({
    url: myApp.baseUrl + '/sign-out/' + myApp.user._id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
  })
  .done(uiSignActions.outSuccess)
  .fail(function(err) {
    console.error(err);
  });
};

let changePassword = function(e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: myApp.baseUrl + '/change-password/' + myApp.user._id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  })
  .done(function(data) {
    console.log(data);
  })
  .fail(function(err) {
    console.error(err);
  });
};

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
};
