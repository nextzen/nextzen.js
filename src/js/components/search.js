var L = require('leaflet');

var Geocoder = require('leaflet-geocoder-mapzen/src/core');

module.exports = Geocoder;
module.exports.geocoder = function(options) {
  var key = L.Mapzen.apiKey || options.key;
  return new Geocoder(key, options);
}