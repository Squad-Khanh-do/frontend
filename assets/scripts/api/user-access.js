'use strict';

const myApp = {
  baseUrl: 'http://localhost:3000',
};

$(document).ready(() => {
  $('.change-password-nav').hide();
  $('.sign-out-nav').hide();
  $('.left-nav').hide();
  $('.loggedin-ui').hide();

  //hides modal after login action
  let hideModal = function (){
    $('#sign-in-modal').modal('hide');
    $('#change-password-modal').modal('hide');
    $('#sign-up-modal').modal('hide');
  };


  //Create new user from form id="sign-up"
  $('#sign-up').on('submit', function(e) {
    e.preventDefault();
    hideModal();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-up',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      // $('#sign-up-modal').modal('hide');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //Signs in registered user
  $('#sign-in').on('submit', function(e) {
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
  });


  //Change password of currently logged-in user
  $('#change-password').on('submit', function(e) {
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
    }).done(function(data) {
      console.log(data);
      // $('#change-password-modal').modal('hide');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //Log out
  $('#sign-out-button').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: myApp.baseUrl + '/sign-out/' + myApp.user._id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
    }).done(function() {
      console.log("User Logged Out");
      $('.left-nav').hide();
      $('.loggedin-ui').hide();
      $('.change-password-nav').hide();
      $('.sign-in-nav').show();
      $('.homepage-content').show();
      $('.sign-out-nav').hide();
      $('.sign-up-nav').show();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
});

module.exports = myApp;
