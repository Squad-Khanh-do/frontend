'use strict';

let access = require('./api/access.js');
//let uiAction = require('./ui/actions.js');

// handlebars template require below
// let navbarTemplate = require('./handlebars/navbar.handlebars');
let modalTemplate = require('./handlebars/sign-modal.handlebars');
let createTemplate = require('./handlebars/create-survey.handlebars');
let editTemplate = require('./handlebars/edit-survey.handlebars');
let dashTemplate = require('./handlebars/dashboard.handlebars');

let init = function() {
  // Main Functionaliy
  $('.modal-body').append(modalTemplate());
  // $('.navbar').append(navbarTemplate());
  $('.create-survey-page').append(createTemplate());
  $('.edit-survey-page').append(editTemplate());
  $('.dashboard-page').append(dashTemplate());
  $('#register').on('submit', access.signUp);
  $('#logIn').on('submit', access.signIn);
  $('#logOut').on('submit', access.signOut);
  $('#changePw').on('submit', access.chPass);
  // Other functions below
};

$(document).ready(init);
