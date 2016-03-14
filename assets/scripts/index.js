'use strict';

require('./api/user-access.js');
//let uiAction = require('./ui/actions.js');

let createTemplate = require('./handlebars/create-survey.handlebars');
let editTemplate = require('./handlebars/edit-survey.handlebars');
let dashTemplate = require('./handlebars/dashboard.handlebars');

let init = function() {
  // Main Functionaliy

  $('.create-survey-page').append(createTemplate());
  $('.edit-survey-page').append(editTemplate());
  $('.dashboard-page').append(dashTemplate());
  // Other functions below
};

$(document).ready(init);
