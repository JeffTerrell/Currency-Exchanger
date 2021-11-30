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
  const symbols = Object.keys(response.conversion_rates);
  symbols.forEach((key) => { 
    const valueOfKey = response.conversion_rates[key];
    if (toCurrency === null) {
      return $("#displayError2").text("Please select a currency to convert");
    }
    if (key === toCurrency) {
      return $('.conversion').text(`${number}${fromCurrency} = ${new ExchangeRateService().converter(valueOfKey, number)}${toCurrency}`);
    }
    $('.showFullList').show();  
    $('.appendFullList').append(`${number}${fromCurrency} = ${parseFloat(valueOfKey * number).toFixed(2)}${key} <br>`);    
  });
}

function displayError(error) {
  $('#displayError').text(`${error}`);
}


$(document).ready(function() {
  ExchangeRateService.getExchangeRate()
  .then(function(response) {    
    const symbolsList = Object.keys(response.conversion_rates);
    let options = '';
    for (var i = 0; i < symbolsList.length; i++) {
      options += '<option value="' + symbolsList[i]+ '">' + symbolsList[i] + '</option>';
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