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
};

let refreshDash = function () {
  $('.create-survey-page').empty();
  $('.result-survey-page').empty();
  api.retrieveSurveys(renderDash, log);
};

$('.survey-tab').on('click', function () {
  let createTemplate = require('../handlebars/create-survey.handlebars');
  $('.create-survey-page').html(createTemplate());
  $('.dashboard-page').empty();
  $('.result-survey-page').empty();
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

let uiResponseSurvey = function() {
  $('.survey-link').on('click', function(e) {
    e.preventDefault();
    var surveyId = $(this).attr('data-results-id');
    api.getOneSurvey(surveyId, function (survey) {
      let responseTemplate = require('../handlebars/response.handlebars');
      $('.dashboard-page').empty();
      $('.create-survey-page').html(responseTemplate({survey}));
      $('.response-submit').on('click', function(){
        api.postResponse(surveyId, '#responseSurvey', refreshDash, refreshDash); // HACK: unknown success or failure order
      });
    });
  });
};

let showResult = function() {
  $('.result').on('click', function(e) {
      e.preventDefault();
      var surveyId = $(this).attr('data-results-id');
      api.getOneSurvey(surveyId, function (survey) {
        $('.dashboard-page').empty();
        let resultTemplate = require('../handlebars/survey-results.handlebars');
        $('.create-survey-page').html(resultTemplate({survey}));
          api.allSurveyResponses(surveyId, function (answer) {
            $('.dashboard-page').empty();
            var arr = answer.surveyResponses;
              var obj = [];
              for (var i = 0; i < arr.length; i++) {
                var result = 0;
                for(var k= 0; k<arr.length; k++){
                  if (arr[i].response === arr[k].response){
                    result +=1;
                  }
                }
              obj.push(' ' + arr[i].response +' : ' + result);
              }
              var uniqueNames = [];
              $.each(obj, function(i, el){
                if($.inArray(el, uniqueNames) === -1) {
                  uniqueNames.push(el);
                }
              $('.result-survey-page').empty();
                for (let i = 0; i < uniqueNames.length; i++){
                  $('.result-survey-page').append(uniqueNames[i] + '<br>');
                }



            });

              console.log(uniqueNames);
            // let responseTemplate = require('../handlebars/response-answer.handlebars');
            // $('.result-survey-page').html(responseTemplate({answer}));
        });  //need to add on failure
    });
  });
};

$('.dashboard-tab').on('click', refreshDash);

module.exports = {
  refreshDash,
};
