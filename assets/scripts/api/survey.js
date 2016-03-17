'use strict';

let myApp = require('../myApp');

let createSurvey = function (formLocation, onSuccess, onFailure) {
  event.preventDefault();  //createSurvey                 // Stops page Reload
  let item = new FormData(document.querySelector(formLocation));  // document.querySelector('#createSurvey')  // object containing the FormData
  $.ajax({
    url: myApp.baseUrl + '/surveys',
    method: 'POST',
    headers: {
      Authorization: 'Token token='+ myApp.user.token,
    },
    dataType: 'json',
    contentType: false,                     // Needed for FormData
    processData: false,                     // Needed for FormData This is because item
    data: item                              // item is referancing the new object called 'item'.
  })
  .done(onSuccess)
  .fail(onFailure);
};

let getOneSurvey = function (id, onSuccess, onFailure) {
  $.ajax({
  url: myApp.baseUrl + "/surveys/" + id,
  method: 'GET',
  headers: {
    Authorization: 'Token token='+ myApp.user.token,
  },
  dataType: 'json'
})
.done(onSuccess)
.fail(onFailure);
};

let retrieveSurveys = function (onSuccess, onFailure) {
  $.ajax({
  url: myApp.baseUrl + "/surveys",
  method: 'GET',
  headers: {
    Authorization: 'Token token='+ myApp.user.token,
  },
  dataType: 'json'
})
.done(onSuccess)
.fail(onFailure);
};

let updateSurvey = function (id, formLocation, onSuccess, onFailure) {
  event.preventDefault();  //createSurvey                 // Stops page Reload
  let item = new FormData(document.querySelector(formLocation));  // document.querySelector('#createSurvey')  // object containing the FormData
  $.ajax({
    url: myApp.baseUrl + '/surveys/'+ id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token='+ myApp.user.token,
    },
    dataType: 'json',
    contentType: false,                     // Needed for FormData
    processData: false,                     // Needed for FormData This is because item
    data: item                              // item is referancing the new object called 'item'.
  })
  .done(onSuccess)
  .fail(onFailure);
};

let deleteSurvey = function (id, onSuccess, onFailure) {
  $.ajax({
  url: myApp.baseUrl + "/surveys/" + id,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token='+ myApp.user.token,
  },
  })
  .done(onSuccess)
  .fail(onFailure);
};

let postResponse = function (id, formLocation, onSuccess, onFailure) {
  event.preventDefault();  //
  let item = new FormData(document.querySelector(formLocation));  // object containing the FormData
  $.ajax({
    url: myApp.baseUrl + '/surveys/' + id + '/surveyResponses',
    method: 'POST',
    dataType: 'json',
    contentType: false,                     // Needed for FormData
    processData: false,                     // Needed for FormData This is because item
    data: item                              // item is referancing the new object called 'item'.
  })
  .done(onSuccess)
  .fail(onFailure);
};


module.exports = {
  postResponse,
  createSurvey,
  getOneSurvey,
  retrieveSurveys,
  updateSurvey,
  deleteSurvey,
};
