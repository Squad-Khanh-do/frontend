'use strict';

let api = require('../api/survey.js');

let log = function (data) {
  console.log(data);
};

let renderDash = function (survey) {
  let dashTemplate = require('../handlebars/dashboard.handlebars');
  $('.dashboard-page').html(dashTemplate({survey}));
    uiDeleteSurvey();
    uiUpdateSurvey();
};

let refreshDash = function () {
  $('.create-survey-page').empty();
  api.retrieveSurveys(renderDash, log);
};

$('.survey-tab').on('click', function () {
  let createTemplate = require('../handlebars/create-survey.handlebars');
  $('.create-survey-page').html(createTemplate());
  $('.dashboard-page').empty();
  $('.create-survey-submit').on('click', function(){
    console.log("submit works");
    api.createSurvey('#createSurvey', function () {
      $('.create-survey-page').empty();
      api.retrieveSurveys(renderDash, log);
    }, log);
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

let uiUpdateSurvey = function() {
  $('.update-button').on('click', function(e) {
    e.preventDefault();
    var surveyId = $(this).attr('data-results-id');
    api.getOneSurvey(surveyId, function (survey) {
      let createSurveyTemplate = require('../handlebars/create-survey.handlebars');
      $('.dashboard-page').empty();
      $('.create-survey-page').html(createSurveyTemplate({survey}));
      $('.create-survey-submit').on('click', function(){
        api.updateSurvey(surveyId, '#createSurvey', log, refreshDash); // HACK: ummm idk why refreshDash needs to be in failure
      });
    }, log);
  });
};

$('.dashboard-tab').on('click', refreshDash);

module.exports = {
  refreshDash,
};
