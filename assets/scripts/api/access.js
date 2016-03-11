'use strict';
// Require js files below
let uiSign = require('../ui/sign.js');
let conf = require('../config.js');
let url = conf.url;

let signUp = function(event, onSuccess, onFailure) {
  event.preventDefault();                   // Stops page Reload
  let item = new FormData(event.target);    // object containing the FormData
  $.ajax({
    url: url + 'sign-up',
    type: 'POST',
    contentType: false,                     // Needed for FormData
    processData: false,                     // Needed for FormData This is because item
    data: item                              // item is referancing the new object called 'item'.
  })
  .done(onSuccess)
  .fail(onFailure);
};

let signIn = function(event, onSuccess, onFailure) {
  event.preventDefault();                   // Stops page Reload
  let item = new FormData(event.target);    // object containing the FormData
  $.ajax({
    url: url + 'sign-in',
    type: 'POST',
    contentType: false,                     // Needed for FormData
    processData: false,                     // Needed for FormData This is because item
    data: item                              // item is referancing the new object called 'item'.
  })
  .done(onSuccess)
  .fail(onFailure);
};

let signOut = function(event, onSuccess, onFailure) {
  event.preventDefault();                // Stops page Reload
  $.ajax({
    url: url + 'sign-out/' + conf.user.user.id,
    type: 'DELETE',
    headers: {
        Authorization: 'Token token=' + conf.user.user.token,
      }
  })
  .done(onSuccess)
  .fail(onFailure);
};

let chPass = function(event, onSuccess, onFailure) {
  event.preventDefault();                   // Stops page Reload
  let item = new FormData(event.target);    // object containing the FormData
  $.ajax({
    url: url + 'change-password/' + conf.user.user.id,
    type: 'PATCH',
    headers: {
        Authorization: 'Token token=' + conf.user.user.token,
      },
    contentType: false,                     // Needed for FormData
    processData: false,                     // Needed for FormData This is because item
    data: item                              // item is referancing the new object called 'item'.
  })
  .done(onSuccess)
  .fail(onFailure);
};

module.exports = {
  signUp,
  signIn,
  signOut,
  chPass,
};
