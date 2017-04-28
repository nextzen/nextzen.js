var L = require('leaflet');

var Geocoder = require('leaflet-geocoder-mapzen/src/core');

module.exports = Geocoder;
module.exports.geocoder = function (key, options) {

  var apiKey;

  if (typeof key !== 'string' && typeof key !== 'object') {
    // When nothing is passed
    apiKey = L.Mapzen.apiKey;
  } else if (typeof key == 'object') {
    // When the key is omitted and options is passed
    apiKey = L.Mapzen.apiKey;
    options = key;
  } else {
    apiKey = key;
  }
  return new Geocoder(apiKey, options);
};
