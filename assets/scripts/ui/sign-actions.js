'use strict';

let myApp = require('../myApp');
let uiSign = require('./survey');

//show user email on navbar
 let showUser = function (){
   $('.user-email-login').html(myApp.user.email);
 };
 let hideUser = function (){
   $('.user-email-login').empty();
 };

//hides modal after login action
let hideModal = function (){
  $('#sign-in-modal').modal('hide');
  $('#change-password-modal').modal('hide');
  $('#sign-up-modal').modal('hide');
};

let renderDash = function (survey) {
  let dashTemplate = require('../handlebars/dashboard.handlebars');
  $('.dashboard-page').html(dashTemplate({survey}));
};

let inSuccess = function (data) {
  myApp.user = data.user;
  $('.change-password-nav').show();
  showUser();
  $('.homepage-content').hide();
  $('.loggedin-ui').show();
  $('.left-nav').show();
  $('.sign-in-nav').hide();
  $('.sign-out-nav').show();
  $('.sign-up-nav').hide();
  hideModal();
  uiSign.refreshDash();
};

let outSuccess = function () {
  $('.left-nav').hide();
  hideUser();
  $('.loggedin-ui').hide();
  $('.change-password-nav').hide();
  $('.sign-in-nav').show();
  $('.homepage-content').show();
  $('.sign-out-nav').hide();
  $('.sign-up-nav').show();
};

module.exports = {
  inSuccess,
  outSuccess,
};
