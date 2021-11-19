import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from "./js/exchangerate.js";


function displayExchangeRate (response) {
  console.log("API: " + response);
  let currencyList = [];
  console.log(currencyList);
  for (let i = 0 ; i < response.conversion_rates.length ; i++) {
    currencyList.push(`Test - ${response.conversion_rates[0].AED}`);
    console.log("dfal: " + currencyList);
    $('.showCurrency').html(currencyList);
  }
}

function displayError(error) {
  $('.displayError').text(`${error}`);
}



$(document).ready(function() {
  $('#currencyConvert').click(function() {
    const usdNumber = $('#usdNumber').val();
    const currency = $('currency').val();
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