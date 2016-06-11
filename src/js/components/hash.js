var Hash = L.Class.extend({

  // we keep hash data here
  hashData: {},
  changing: false,
  _map: null,
  _geocoder: null,

  initialize: function (map, geocoder) {
    if(map) {
      this._map = map;
      this._startMapEvents();
    }
    if(geocoder) {
      this._geocoder = geocoder;
      this._startGeocoderevents()
    }
  },

  _startMapEvents: function () {
    this._watchHash();
    L.DomEvent.on(window, 'onhashchange', this._watchHash, this);
    L.DomEvent.on(this._map, 'moveend', this._updateLatLng, this);
    L.DomEvent.on(this._map, 'zoomend', this._updateZoom, this);
  },
  _watchHash: function () {
    var currentDataObj = Formatter.parseHashToObj(location.hash);
    this.hashData = currentDataObj;
    this.changing = true;
    this._map.setView([this.hashData.lat, this.hashData.lng],this.hashData.z)
    this.changing = false;
  },

  _updateLatLng: function () {

    if (!this.changing) {
      var center = this._map.getCenter();
      var zoom = this._map.getZoom();

      var precision = this._precision(zoom);
      var newLat = center.lat.toFixed(precision);
      var newLng = center.lng.toFixed(precision);
      this.hashData.lat = newLat;
      this.hashData.lng = newLng;

      var formattedData = Formatter.formatToHash(this.hashData);
      window.history.replaceState({}, null, '#' + formattedData);
    }
  },

  _updateZoom: function () {
    if (!this.changing) {
      var zoom = this._map.getZoom();
      this.hashData.z = zoom;
      var formattedData = Formatter.formatToHash(this.hashData);
      window.history.replaceState({}, null, '#' + formattedData);
    }
  },
  _precision: function (z) {
    return Math.max(0, Math.ceil(Math.log(z) / Math.LN2));
  },

  _startGeocoderevents: function() {
    L.DomEvent.on(this._geocoder, 'select', this._updatePlaceQuery, this);
  },

  _updatePlaceQuery: function () {

  }

});


var Formatter = {
  parseHashToObj: function (rawHash) {
    var dObj = {};

    if (this.isEmpty(rawHash)) {
      return null;
    } else {
      var hashVal = rawHash.replace('#','');
      var valArrs = hashVal.split('&');

      for(var val in valArrs) {
        var keyAndValue = valArrs[val].split('=');
        dObj[keyAndValue[0]] = keyAndValue[1]
      }

      return dObj;
    }
  },
  isEmpty: function(str) {
    if (!str || 0 === str.length) return true;
    else return false;
  },

  formatToHash: function (obj) {
    var str = [];
    for (var p in obj) {
      // Nulls or undefined is just empty string
      if (obj[p] === null || typeof obj[p] === 'undefined') {
        obj[p] = '';
      }
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return str.join('&');
  }
}

module.exports = Hash;

module.exports.hash = function (map, geocoder) {
  return new Hash(map, geocoder);
};
