import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from "./js/exchangerate.js";


function displayExchangeRate (response, usdNumber, currency) {
  const keys = Object.keys(response.conversion_rates);
  const currency2 = currency;
  console.log("currency2: "+ currency2);
  keys.forEach((key) => { 
    const valueOfKey = response.conversion_rates[key];
    if (currency === "select") {
      return $(".displayError2").text("Please select a valid currency to convert");
    }
    if (key === currency) {
      $('.test3').text(`USD-${currency}: ${converter(valueOfKey, usdNumber)}`);
    } else {
        $(".displayError2").text("Error: Refresh Webpage");
      }
    
function converter(currency, number) {
  const output = number * currency;
  return output;
}

    $('.test2').append(`USD-${key}: ${valueOfKey} <br>`);
    $('.test1').append(`${key}: ${valueOfKey} <br>`);
  });
  $('.showCurrency').text(`USD to is: ${response.conversion_rates.BGN}`);
}



function displayError(error) {
  $('.displayError').text(`${error}`);
}



$(document).ready(function() {
  $('#currencyConvert').click(function() {
    const usdNumber = $('#usdNumber').val();
    const currency = $('#currency').val();
    console.log("currency: " + currency);
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