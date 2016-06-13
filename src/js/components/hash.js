var Hash = L.Class.extend({

  // We keep hash data in _hashData obj
  _hashData: {},
  changing: false,
  _map: null,
  _geocoder: null,

  initialize: function (map, geocoder) {
    if (map) {
      this._map = map;
      this._startMapEvents();
    }

    if (geocoder) {
      this._geocoder = geocoder;
      this._startGeocoderEvents()
    }

    this._setupHash();
    L.DomEvent.on(window, 'onhashchange', this._setupHash, this);
  },

  _setupHash: function () {
    var currentDataObj = Formatter.parseHashToObj(location.hash);
    this._hashData = currentDataObj;
    if (this._hashData)  {

      // When there is place query in hash, it takes priority to the coord data.
      if (this._hashData.place) {
        this._hashData.place = decodeURIComponent(this._hashData.place);
        this._geocoder.place(this._hashData.place);
      } else if (this._hashData.lat && this._hashData.lng && this._hashData.z) {
        // boolean changing is to prevent recursive hash change
        // Hash doesn't get updated while map is setting the view
        this.changing = true;
        this._map.setView([this._hashData.lat, this._hashData.lng],this._hashData.z);
        this.changing = false;
      }
    } else {
      // When there is no hash, get current map status
      this._hashData = {};
      this._updateLatLng();
      this._updateZoom();
    }
  },

  _startMapEvents: function () {
    L.DomEvent.on(this._map, 'moveend', this._updateLatLng, this);
    L.DomEvent.on(this._map, 'zoomend', this._updateZoom, this);
  },

  _startGeocoderEvents: function () {
    L.DomEvent.on(this._geocoder, 'select', this._updatePlace, this);
    L.DomEvent.on(this._geocoder, 'reset', this._resetPlace, this);
  },

  _updateLatLng: function () {

    if (!this.changing) {

      var center = this._map.getCenter();
      var zoom = this._map.getZoom();

      var precision = this._precision(zoom);
      var newLat = center.lat.toFixed(precision);
      var newLng = center.lng.toFixed(precision);
      this._hashData.lat = newLat;
      this._hashData.lng = newLng;

      this._updateHash();
    }
  },

  _updateZoom: function () {
    if (!this.changing) {
      var zoom = this._map.getZoom();
      this._hashData.z = zoom;
      this._updateHash();
    }
  },

  _updatePlace: function (e) {
    this._hashData.place = e.feature.properties.gid;
    this._updateHash();
  },

  _resetPlace: function () {

    this._hashData = Formatter.deleteProperty(this._hashData, 'place');
    this._updateHash();
  },

  _updateHash: function () {
    var formattedData = Formatter.formatToHash(this._hashData);
    window.history.replaceState({}, null, '#' + formattedData);
  },

  _precision: function (z) {
    return Math.max(0, Math.ceil(Math.log(z) / Math.LN2));
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
  isEmpty: function (str) {
    if (!str || 0 === str.length) return true;
    else return false;
  },
  deleteProperty: function (dobj, _prop) {
    var newObj = {};
    for (var p in dobj) {
      if(p !== _prop) {
        newObj[p] = dobj[p];
      }
    }
    return newObj;
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
