'use strict';

let env = require('./user-access');

let createSurvey = function (event, onSuccess, onFailure) {
  event.preventDefault();                   // Stops page Reload
  let item = new FormData(document.querySelector('#createSurvey'));    // object containing the FormData
  console.log(item);
  $.ajax({
    url: env.baseUrl + "/surveys",
    // url: 'http://httpbin.org/post',
    method: 'POST',
    headers: {
      Authorization: 'Token token='+ env.user.token,
    },
    dataType: 'json',
    contentType: false,                     // Needed for FormData
    processData: false,                     // Needed for FormData This is because item
    data: item                              // item is referancing the new object called 'item'.
  })
  .done(onSuccess)
  .fail(onFailure);
};


module.exports = {
  createSurvey
};
