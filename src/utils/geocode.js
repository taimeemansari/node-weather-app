const request = require('request');

const geocode = function (address, callback) {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiYW5zYXJpNzY4IiwiYSI6ImNrZXI2bmYzODBqN2IyeHI2Mm5kcTFydjcifQ.xxR9mwOsPJ8PxCdfeFqNTA';
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to fetch the data from api', undefined);
    } else if (response.body.features[0] === 0) {
      callback('No results found. try another search', undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

// geoCode('shaikpet', geoCallBack);

module.exports = geocode;
