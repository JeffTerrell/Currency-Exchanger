import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from "./js/exchangerate.js";


function displayExchangeRate (response, usdNumber, currency) {
  const keys = Object.keys(response.conversion_rates);
  keys.forEach((key) => { 
    const valueOfKey = response.conversion_rates[key];
    if (currency === "select") {
      return $(".displayError2").text("Please select a valid currency to convert");
    }
    if (key === currency) {
      $('.conversion').text(`USD-${currency}: ${new ExchangeRateService().converter(valueOfKey, usdNumber)}`);
    } else {
        $(".displayError2").text("Error: Refresh Webpage Test");
      }
    

    $('.displayFullList').append(`USD-${key}: ${valueOfKey} <br>`);
    
  });
}

function displayError(error) {
  $('.displayError').text(`${error}`);
}


$(document).ready(function() {
  $('#currencyConvert').click(function() {
    const usdNumber = $('#usdNumber').val();
    console.log("number" + usdNumber);
    const currency = $('#currency').val();
    console.log("Currency: " + currency);
    $('#usdNumber').val("");
    $('#currency').val("");

    ExchangeRateService.getExchangeRate()
      .then(function(response) {
        if (response instanceof Error) {
          throw Error(`ExchangeRate API error: ${response.message}`);
        }
        displayExchangeRate(response, usdNumber, currency);
      })
      .catch(function(error) {
        displayError(error.message);
      });
  });
});