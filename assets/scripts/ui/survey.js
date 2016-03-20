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
    uiResponseSurvey();
    showResult();
    $('.result-title').hide();
};

let refreshDash = function () {
  $('.create-survey-page').empty();
  $('.result-survey-page').empty();
  api.retrieveSurveys(renderDash, log);ß
};

let displaySurveyType = function(type, showItem, hideItem, optional){
  $(type).on('click', function(){
    $(showItem).show();
    $(hideItem).hide();
    $(optional).val('');
  });
};

let createSurveyDisplay = function(){
  $('.dashboard-page').empty();
  $('.result-survey-page').empty();
  $('.options').hide();
  $('.fill-in').hide();
  $('.result-title').hide();
};

$('.survey-tab').on('click', function () {
  let createTemplate = require('../handlebars/create-survey.handlebars');
  $('.create-survey-page').html(createTemplate());
  createSurveyDisplay();
  displaySurveyType('#multiple-choice', '.options', '.fill-in');
  displaySurveyType('#text', '.fill-in', '.options', '.mc-answer');
  $('.create-survey-submit').on('click', function(){
    api.createSurvey('#createSurvey', function () {
      $('.create-survey-page').empty();
      $('.result-title').hide();
      api.retrieveSurveys(renderDash, log);
    }, log);
  });
});

let uiDeleteSurvey = function() {
  $('.delete-button').on('click', function(e) {
    e.preventDefault();
    $('.deleteModal').modal('show');
    let surveyId = $(this).attr('data-results-id');
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
    let surveyId = $(this).attr('data-results-id');
    api.getOneSurvey(surveyId, function (survey) {
      let createSurveyTemplate = require('../handlebars/create-survey.handlebars');
      $('.dashboard-page').empty();
      $('.create-survey-page').html(createSurveyTemplate({survey}));
      displaySurveyType('#multiple-choice', '.options', '.fill-in');
      displaySurveyType('#text', '.fill-in', '.options', '.mc-answer');
      $('.create-survey-submit').on('click', function(){
        api.updateSurvey(surveyId, '#createSurvey', log, refreshDash); // HACK: ummm idk why refreshDash needs to be in failure
      });
    }, log);
  });
};

let displayResponseChoice = function(mcAnswer, options, text){
  if($(mcAnswer).val() === ''){
    $(options).hide();
  }
  else{
    $(text).hide();
  }
};


let uiResponseSurvey = function() {
  $('.survey-link').on('click', function(e) {
    e.preventDefault();
    let surveyId = $(this).attr('data-results-id');
    api.getOneSurvey(surveyId, function (survey) {
      let responseTemplate = require('../handlebars/response.handlebars');
      $('.dashboard-page').empty();
      $('.create-survey-page').html(responseTemplate({survey}));
      displayResponseChoice('.mc-ans', '.options-answer', '.answer-text');
      $('.response-submit').on('click', function(){
        api.postResponse(surveyId, '#responseSurvey', refreshDash, refreshDash); // HACK: unknown success or failure order
      });
    });
  });
};

let resultArray = function(arr, item){
  let obj = [];
  for (let i = 0; i < arr.length; i++) {
    let result = 0;
    for(let k= 0; k<arr.length; k++){
      if (arr[i][item] === arr[k][item]){
        result +=1;
      }
    }
    obj.push(' ' + arr[i][item] +' : ' + result);
  }
  return obj;
};

let displayUniqueValues = function(arr, item){
  let uniqueNames = [];
  $.each(resultArray(arr,  item), function(i, el){
    if($.inArray(el, uniqueNames) === -1) {
      uniqueNames.push(el);
    }
    $('.result-survey-page').empty();
    for (let i = 0; i < uniqueNames.length; i++){
      $('.result-survey-page').append(uniqueNames[i] + '<br>');
    }
  });
};

let showResult = function() {
  $('.result').on('click', function(e) {
      e.preventDefault();
      let surveyId = $(this).attr('data-results-id');
      api.getOneSurvey(surveyId, function (survey) {
        $('.dashboard-page').empty();
        let resultTemplate = require('../handlebars/survey-results.handlebars');
        $('.create-survey-page').html(resultTemplate({survey}));
          api.allSurveyResponses(surveyId, function (answer) {
            $(".result-title").show();
            $('.dashboard-page').empty();
            displayUniqueValues(answer.surveyResponses, "response");
        },log);
    });
  });
};

$('.dashboard-tab').on('click', refreshDash);

module.exports = {
  refreshDash,
};
