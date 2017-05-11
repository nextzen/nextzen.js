var L = require('leaflet');
var APIKeyCheck = require('./apiKeyCheck');
var Geocoder = require('leaflet-geocoder-mapzen/src/core');

module.exports = Geocoder;
module.exports.geocoder = function (_key, _options) {
  var apiKey;
  var options = {};
  var attribution = '';

  if (typeof _key !== 'string' && typeof _key !== 'object') {
    // When nothing is passed
    apiKey = L.Mapzen.apiKey;

  } else if (typeof _key === 'object') {
    // When the key is omitted and options is passed
    apiKey = L.Mapzen.apiKey;
    options = _key;
  } else {
    apiKey = _key;
    options = _options;
  }

  if (options.attribution) attribution += options.attribution;
  options.attribution = attribution;

  if (!APIKeyCheck.isValidMapzenApiKey(apiKey)) {
    APIKeyCheck.throwApiKeyWarning('Search');
  }

  return new Geocoder(apiKey, options);
};
