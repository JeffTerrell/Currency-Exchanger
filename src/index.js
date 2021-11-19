import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from "./js/exchangerate.js";


function displayExchangeRate (response) {
  const keys = Object.keys(response.conversion_rates);
  // const number1 = 10
  // const type = "USD";
  console.log("test: " + keys);
  keys.forEach((key) => {
    console.log(`${key}: ${response.conversion_rates[key]}`);
    const type = response.conversion_rates[key];
    console.log("type: " + type);
    $('.test1').append(`${key}: ${type} <br>`);

  });
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










  // Object.values(response.conversion_rates).forEach(val => console.log(val));
  // const entries = Object.entries(response.conversion_rates);
  // console.log("entries: " + entries)

  // let currencies = [];
  // for ( let i = 0 ; i < keys.length ; i++) {
  //   currencies.push(`${keys[i]}`);
  //   $('.test1').html(currencies);
  //   console.log("test2; " + currencies);
  // }