export default class ExchangeRateService {
  static getExchangeRate() {
    return fetch (`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`)
    .then (function(response) {
      if (!response.ok) {
        throw Error (response.statusText);
      }
      return response.json();  
    })
    .catch (function(error) {
      return Error(error);
    }); 
  }

  converter(currency, number) {
    const output = number * currency;
    return output;
  }
}
