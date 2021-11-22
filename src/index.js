import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from "./js/exchangerate.js";


function displayExchangeRate (response, usdNumber, currency) {
  const keys = Object.keys(response.conversion_rates);
  const ans = Array.isArray(keys);
  console.log(ans);

  let options = '';
  for (var i = 0; i < keys.length; i++) {
    options += '<option value="' + keys[i]+ '">' + keys[i] + '</option>';
  }
  $("#testing").html(options);

  let curObject = keys.reduce((acc, elem) => {
    acc[elem] = elem
    return acc
  }, {})
  console.log(curObject);

  keys.forEach((key) => { 
    const valueOfKey = response.conversion_rates[key];
    if (currency === "select") {
      return $(".displayError2").text("Please select a valid currency to convert");
    }
    if (key === currency) {
      return $('.conversion').text(`USD-${currency}: ${new ExchangeRateService().converter(valueOfKey, usdNumber)}`);
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
  // $('#currencyConvert').click(function() {
    const usdNumber = $('#usdNumber').val();
    console.log("number" + usdNumber);
    const currency = $('#currency').val();
    console.log("Currency: " + currency);
    $('#usdNumber').val("");
    $('#currency').val("");

    ExchangeRateService.getExchangeRate()
      .then(function(response) {

        
        const keys2 = Object.keys(response.conversion_rates);
        let options = '';
        for (var i = 0; i < keys2.length; i++) {
          options += '<option value="' + keys2[i]+ '">' + keys2[i] + '</option>';
        }
        $("#testing").html(options);


        if (response instanceof Error) {
          throw Error(`ExchangeRate API error: ${response.message}`);
        }
        displayExchangeRate(response, usdNumber, currency);
      })
      .catch(function(error) {
        displayError(error.message);
      });
  });
// });