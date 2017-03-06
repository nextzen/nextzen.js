var L = require('leaflet');
var AJAX = require('./ajax');

var MapzenControlGeocoder = L.Class.extend({
  options: {
    serviceUrl: 'https://search.mapzen.com/v1',
    geocodingQueryParams: {},
    reverseQueryParams: {}
  },

  initialize: function(apiKey, options) {
    L.Util.setOptions(this, options);
    this._apiKey = apiKey;
    this._lastSuggest = 0;
  },

  geocode: function(query, cb, context) {
    var _this = this;
    AJAX.request(this.options.serviceUrl + "/search", L.extend({
      'api_key': this._apiKey,
      'text': query
    }, this.options.geocodingQueryParams), function(err, data) {
      cb.call(context, _this._parseResults(data, "bbox"));
    }, _this);
  },

  suggest: function(query, cb, context) {
    var _this = this;
    AJAX.request(this.options.serviceUrl + "/autocomplete", L.extend({
      'api_key': this._apiKey,
      'text': query
    }, this.options.geocodingQueryParams), function(err, data) {
      console.log(data);
      if (data.geocoding.timestamp > this._lastSuggest) {
        this._lastSuggest = data.geocoding.timestamp;
        cb.call(context, _this._parseResults(data, "bbox"));
      }
    }, _this);
  },

  reverse: function(location, scale, cb, context) {
    var _this = this;
    AJAX.request(this.options.serviceUrl + "/reverse", L.extend({
      'api_key': this._apiKey,
      'point.lat': location.lat,
      'point.lon': location.lng
    }, this.options.reverseQueryParams), function(err, data) {
      cb.call(context, _this._parseResults(data, "bounds"));
    }, _this);
  },

  _parseResults: function(data, bboxname) {
    var results = [];
    L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
      onEachFeature: function(feature, layer) {
        var result = {},
          bbox,
          center;

        if (layer.getBounds) {
          bbox = layer.getBounds();
          center = bbox.getCenter();
        } else {
          center = layer.getLatLng();
          bbox = L.latLngBounds(center, center);
        }

        result.name = layer.feature.properties.label;
        result.center = center;
        result[bboxname] = bbox;
        result.properties = layer.feature.properties;
        results.push(result);
      }
    });
    return results;
  }
});


module.exports = MapzenControlGeocoder;

module.exports.controlGeocoder = function (options) {
  if (options) var apiKey = options.apikey || L.Mapzen.apiKey;
  else var apiKey = L.Mapzen.apiKey;
  if (!apiKey) console.warn('You can only have limited access to Mapzen Search withoout api key.');
  return new MapzenControlGeocoder(apiKey, options);
};

