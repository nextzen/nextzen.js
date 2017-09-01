var APIKeyCheck = require('./apiKeyCheck');
var Geocoder = require('leaflet-geocoder-mapzen/src/core');
var corslite = require('@mapbox/corslite');

Geocoder.prototype.serialize = function (params) {
  var data = '';

  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      var param = params[key];
      var type = param.toString();
      var value;

      if (data.length) {
        data += '&';
      }

      switch (type) {
        case '[object Array]':
          value = (param[0].toString() === '[object Object]') ? JSON.stringify(param) : param.join(',');
          break;
        case '[object Object]':
          value = JSON.stringify(param);
          break;
        case '[object Date]':
          value = param.valueOf();
          break;
        default:
          value = param;
          break;
      }

      data += encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }
  }
  return data;
};

Geocoder.prototype.getSearchResult = function (input, callback) {
  var param = {
    text: input
  };
  var params = this.getParams(param);
  corslite(this.options.url + '/search?' + this.serialize(params), callback, true);
};

Geocoder.prototype.getAutoCompleteResult = function (input, callback) {
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
