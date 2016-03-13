'use strict';

let access = require('./api/access.js');
//let uiAction = require('./ui/actions.js');

// handlebars template require below
let navbarTemplate = require('./handlebars/navbar.handlebars');
let modalTemplate = require('./handlebars/sign-modal.handlebars');
let surveyTemplate = require('./handlebars/create-survey.handlebars');

let init = function() {
  // Main Functionaliy
  $('.modal-body').append(modalTemplate());
  $('.navbar').append(navbarTemplate());
  $('.create-survey-page').append(surveyTemplate());
  $('#register').on('submit', access.signUp);
  $('#logIn').on('submit', access.signIn);
  $('#logOut').on('submit', access.signOut);
  $('#changePw').on('submit', access.chPass);
  // Other functions below
};

$(document).ready(init);
