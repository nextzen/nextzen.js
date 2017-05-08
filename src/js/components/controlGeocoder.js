var L = require('leaflet');
var MapzenControlGeocoder = require('leaflet-control-geocoder/src/geocoders/mapzen');
var APIKeyCheck = require('./apiKeyCheck');

module.exports = MapzenControlGeocoder;

module.exports.controlGeocoder = function(key, options) {
  var params = APIKeyCheck.getKeyAndOptions(key, options);
  if (!APIKeyCheck.isValidMapzenApiKey(params.key)) {
    APIKeyCheck.throwApiKeyWarning('Search');
  }
  return new MapzenControlGeocoder.class(params.key, params.options);
}