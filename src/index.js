import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from "./js/exchangerate.js";


function displayExchangeRate (response, number, fromCurrency, toCurrency) {
  const keys = Object.keys(response.conversion_rates);
  const ans = Array.isArray(keys);
  console.log(ans);

  keys.forEach((key) => { 
    const valueOfKey = response.conversion_rates[key];
    if (toCurrency === null) {
      return $(".displayError2").text("Please select a currency to convert");
    }
    if (key === toCurrency) {
      return $('.conversion').text(`${fromCurrency}-${toCurrency}: ${new ExchangeRateService().converter(valueOfKey, number)}`);
    }

    $('.showFullList').show();  
    $('.appendFullList').append(`${fromCurrency}-${key}: ${valueOfKey} <br>`); // need code to clear append each time on new submit
    
  });
}

function displayError(error) {
  $('.displayError').text(`${error}`);
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
      console.log("number" + number);
      const fromCurrency = $('#fromCurrency').val();
      console.log(" From Currency: " + fromCurrency);
      const toCurrency = $('#toCurrency').val();
      console.log("To Currency: " + toCurrency);
      $('#number').val("");
      $('#toCurrency').val("");
      $('#fromCurrency').val("");
      $('.displayError').val("");
      $('.dispalyError2').val("");

      ExchangeRateService.getExchangeRateFromCurrency(fromCurrency)
      .then(function(response) {
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

// let options = '';
// for (var i = 0; i < keys.length; i++) {
//   options += '<option value="' + keys[i]+ '">' + keys[i] + '</option>';
// }
// $("#testing").html(options);

// let curObject = keys.reduce((acc, elem) => {
//   acc[elem] = elem
//   return acc
// }, {})
// console.log(curObject);