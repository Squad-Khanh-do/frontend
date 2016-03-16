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
    api.createSurvey('#createSurvey', refreshDash, log);
  });
});

let uiDeleteSurvey = function() {
  $('.delete-button').on('click', function(e) {
    e.preventDefault();
    $('.deleteModal').modal('show');
    var surveyId = $(this).attr('data-results-id');
    $('.delete-survey-button').on('click', function(e){
      e.preventDefault();
      api.deleteSurvey(surveyId, function(){
        $('.deleteModal').modal('hide');
        refreshDash();
      }, log);
    });
  });
};

let renderDash = function (survey) {
  let dashTemplate = require('../handlebars/dashboard.handlebars');
  $('.dashboard-page').html(dashTemplate({survey}));
    uiDeleteSurvey();
};

let refreshDash = function () {
  $('.create-survey-page').empty();
  api.retrieveSurveys(renderDash, log);
  // add button controller JQ
};

$('.dashboard-tab').on('click', refreshDash);

module.exports = true;
