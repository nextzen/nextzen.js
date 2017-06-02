var APIKeyCheck = require('./apiKeyCheck');
var Geocoder = require('leaflet-geocoder-mapzen/src/core');

module.exports = Geocoder;

module.exports.geocoder = function (key, options) {
  var params = APIKeyCheck.getKeyAndOptions(key, options);
  // If there is no attribution user passes,
  // Geocoder will skip the attribution since mapzen.js's map compoent is handling it already.
  if (params.options && !params.options.attribution) params.options.attribution = '';
  if (!APIKeyCheck.isValidMapzenApiKey(params.key)) {
    APIKeyCheck.throwApiKeyWarning('Search');
  }

  return new Geocoder(params.key, params.options);
};
