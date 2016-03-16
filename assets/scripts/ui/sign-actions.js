'use strict';

let myApp = require('../myApp');


let other = function () {
  // things to be called later
  let editTemplate = require('../handlebars/edit-survey.handlebars');
  $('.edit-survey-page').append(editTemplate());
};

//hides modal after login action
let hideModal = function (){
  $('#sign-in-modal').modal('hide');
  $('#change-password-modal').modal('hide');
  $('#sign-up-modal').modal('hide');
};

let surveyTemplateShow = function () {
  // templates to render after successful signin
  let dashTemplate = require('../handlebars/dashboard.handlebars');
  $('.dashboard-page').append(dashTemplate());
};

let inSuccess = function (data) {
  myApp.user = data.user;
  $('.change-password-nav').show();
  $('.homepage-content').hide();
  $('.loggedin-ui').show();
  $('.left-nav').show();
  $('.sign-in-nav').hide();
  $('.sign-out-nav').show();
  $('.sign-up-nav').hide();
  surveyTemplateShow();
  hideModal();
};

let outSuccess = function () {
  $('.left-nav').hide();
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
