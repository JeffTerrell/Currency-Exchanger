import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from "./js/exchangerate.js";


function displayExchangeRate (response) {
  console.log("API: " + response);
  const keys = Object.keys(response.conversion_rates);
  console.log("test: " + keys);
  keys.forEach((key, index) => {
    console.log(`${key}: ${response.conversion_rates[index]}`)
  })
  // let currencies = [];
  // for ( let i = 0 ; i < keys.length ; i++) {
  //   currencies.push(`${keys[i]}`);
  //   $('.test1').html(currencies);
  //   console.log("test2; " + currencies);
  // }
  $('.showCurrency').text(`USD to is: ${response.conversion_rates.BGN}`);
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