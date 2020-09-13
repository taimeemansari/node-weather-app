const request = require('request');

const forecast = function (latitude, longitude, callback) {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?lat=' +
    latitude +
    '&lon=' +
    longitude +
    '&units=metric&appid=5ea022b2fe046c0e0e5f94e6e37fa1a3';

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to Open Weather API', undefined);
    } else {
      callback(undefined, {
        weather: response.body.weather[0].main,
        temparture: response.body.main.temp,
      });
    }
  });
};

//forecast(35, 17, forecastCallback);

module.exports = forecast;
