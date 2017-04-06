var L = require('leaflet');

var Geocoder = require('leaflet-geocoder-mapzen/src/core');

module.exports = Geocoder;
module.exports.geocoder = function(key, options) {
  // When the key is omitted and options was passed
  var apiKey;
  if (typeof key !== 'string') {
    apiKey = L.Mapzen.apiKey;
  } else {
    apiKey = key;
  }
  return new Geocoder(apiKey, options);
}