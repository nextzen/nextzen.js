var APIKeyCheck = require('./apiKeyCheck');
var Geocoder = require('leaflet-geocoder-mapzen/src/core');
var corslite = require('@mapbox/corslite');

Geocoder.prototype.getSearchResult = function (input, callback) {
  var param = {
    text: input
  };
  var params = this.getParams(param);
  corslite(this.options.url + '/search?' + this.serialize(params), callback, true);
};

Geocoder.prototype.getAutocompleteResult = function (input, callback) {
  var param = {
    text: input
  };

  var params = this.getParams(param);
  corslite(this.options.url + '/autocomplete?' + this.serialize(params), callback, true);
};

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
