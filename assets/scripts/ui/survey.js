'use strict';

let api = require('../api/survey.js');

let log = function (data) {
  console.log(data);
};

$('#createSurvey .form-row button').on('click', function () {
  event.preventDefault();
  console.log('your button was clicked \n should see formData below \n');
});

module.exports = true;
