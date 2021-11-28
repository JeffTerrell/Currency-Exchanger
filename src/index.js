import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from "./js/exchangerate.js";

function clearAll () {
  $('#number').val("");
  $('#toCurrency').val("");
  $('#fromCurrency').val("");
  $('.conversion').text("");
  $('.appendFullList').html("");
  $('.showFullList').hide();
  $("#displayError").text("");
  $("#displayError2").text("");
}

function displayExchangeRate (response, number, fromCurrency, toCurrency) {
  const keys = Object.keys(response.conversion_rates);
  keys.forEach((key) => { 
    const valueOfKey = response.conversion_rates[key];
    if (toCurrency === null) {
      return $("#displayError2").text("Please select a currency to convert");
    }
    if (key === toCurrency) {
      return $('.conversion').text(`${number}${fromCurrency} = ${new ExchangeRateService().converter(valueOfKey, number)}${toCurrency}`);
    }
    $('.showFullList').show();  
    $('.appendFullList').append(`${fromCurrency}-${key}: ${parseFloat(valueOfKey).toFixed(2)} <br>`);    
  });
}

function displayError(error) {
  $('#displayError').text(`${error}`);
}


$(document).ready(function() {
  ExchangeRateService.getExchangeRate()
  .then(function(response) {    
    const keys2 = Object.keys(response.conversion_rates);
    let options = '';
    for (var i = 0; i < keys2.length; i++) {
      options += '<option value="' + keys2[i]+ '">' + keys2[i] + '</option>';
    }
    $("#fromCurrency").html(options);
    $("#toCurrency").html(options);

    if (response instanceof Error) {
      throw Error(`ExchangeRate API error: ${response.message}`);
    }
    $('#toCurrency').val("");
    $('#fromCurrency').val("");

    $('#currencyConvert').click(function() {
      const number = $('#number').val();
      const fromCurrency = $('#fromCurrency').val();
      const toCurrency = $('#toCurrency').val();

      ExchangeRateService.getExchangeRateFromCurrency(fromCurrency)
      .then(function(response) {
        clearAll();
        if (response instanceof Error) {
          throw Error(`Please select both a "from" and "to" currency: ${response.message}`);
        }
        displayExchangeRate(response, number, fromCurrency, toCurrency);
      })
      .catch(function(error) {
        displayError(error.message);
      });
    });
  });
});








// TEST CODE

// let options = '';    *************** creates an array from object and makes a dropdown select list on html
// for (var i = 0; i < keys.length; i++) {
//   options += '<option value="' + keys[i]+ '">' + keys[i] + '</option>';
// }
// $("#testing").html(options);

// let curObject = keys.reduce((acc, elem) => {  *********creates an object with specified key : value pair
//   acc[elem] = elem
//   return acc
// }, {})
// console.log(curObject);


// const ans = Array.isArray(keys);
// console.log(ans);