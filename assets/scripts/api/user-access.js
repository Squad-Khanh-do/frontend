'use strict';

let uiSurvey = require('../ui/survey');
let myApp = require('../myApp');

//hides modal after login action
let hideModal = function (){
  $('#sign-in-modal').modal('hide');
  $('#change-password-modal').modal('hide');
  $('#sign-up-modal').modal('hide');
};

let signUp = function (e) {
  e.preventDefault();
  hideModal();
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
    // $('#sign-up-modal').modal('hide');
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let signIn = function (e) {
  e.preventDefault();
  hideModal();
  var formData = new FormData(e.target);
  $.ajax({
    url: myApp.baseUrl + '/sign-in',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    myApp.user = data.user;
    console.log(data);
    $('.change-password-nav').show();
    $('.homepage-content').hide();
    $('.loggedin-ui').show();
    $('.left-nav').show();
    $('.sign-in-nav').hide();
    $('.sign-out-nav').show();
    $('.sign-up-nav').hide();
  }).fail(function(jqxhr) {
    console.error(jqxhr);
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
  .done(function() {
    console.log("User Logged Out");
    $('.left-nav').hide();
    $('.loggedin-ui').hide();
    $('.change-password-nav').hide();
    $('.sign-in-nav').show();
    $('.homepage-content').show();
    $('.sign-out-nav').hide();
    $('.sign-up-nav').show();
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let changePassword = function(e) {
  e.preventDefault();
  hideModal();
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
    // $('#change-password-modal').modal('hide');
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
};
