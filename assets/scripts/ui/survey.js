'use strict';

let api = require('../api/survey.js');

let log = function (data) {
  console.log(data);
};

$('.survey-tab').on('click', function () {
  let createTemplate = require('../handlebars/create-survey.handlebars');
  $('.create-survey-page').html(createTemplate());
  $('.dashboard-page').empty();
  $('.create-survey-submit').on('click', function(){
    console.log("submit works");
    api.createSurvey('#createSurvey', log, log);
  });
});

// event.preventDefault();
// api.createSurvey(event, function (items) {
//       let dashTemplate = require('../handlebars/dashboard.handlebars');
//       $('.dashboard-page').append(dashTemplate({items}));
// }, log);

module.exports = true;
