/*$(document).ready(function() {
  $('#ageButton').click(function(e) {*/
function getAgeFact(age) {
                  console.log(age);
                  $.get('http://numbersapi.com/' + age, function(data) {
                    $('#number').text(data);
                  });
                };
