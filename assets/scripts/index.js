'use strict';

let user = require('./api/user-access.js');
//let uiAction = require('./ui/actions.js');

// handlebars template require below

let init = function() {
  // Main Functionaliy
  $('#sign-up').on('submit', user.signUp);
  $('#sign-in').on('submit', user.signIn);
  $('#change-password').on('submit', user.changePassword);
  $('#sign-out-button').on('click', user.signOut);
  // Other functions below
  $('.change-password-nav').hide();
  $('.sign-out-nav').hide();
  $('.left-nav').hide();
  $('.loggedin-ui').hide();
  // uiAction.grabListId();
};

$(document).ready(init);
