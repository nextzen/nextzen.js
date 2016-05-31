'use strict';
var MapControl = L.Map.extend ({

  _hasWebGL: function () {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (x) {
      return false;
    }
  },

  _isThisIframed: function () {
    if (window.self !== window.top) return true;
    else return false;
  },

  //overriding Leaflet's map initializer
  initialize: function (element, options) {
    L.Map.prototype.initialize.call(this, element, options);

    // overriding double click behaviour to zoom up where it is clicked
    this.doubleClickZoom.disable();
    this.setView([51.505, -0.09], 13);
    this.on('dblclick', function (e) {
      this.setView(e.latlng, this.getZoom() + 1);
    });

    // do not activate scroll wheel zoom when map is iframed
    this.scrollWheelZoom = this._isThisIframed();
    this._setupHash(this);

    this.setupScene = function (scene) {
        if (this._hasWebGL()) {
          // adding tangram layer
          Tangram.leafletLayer({
            scene: scene,
            attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
          }).addTo(this);
        } else {
          // adding osm default tile layer for
          console.log('WebGL is not available, falling back to OSM default tile.');
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          }).addTo(this);
        }
      }
    },

    _setupHash: function (map) {
      var hashable = require('hashable');
      // setting Location Hash with hashable
      var hash = hashable.hash()
        .change(function (e) {
          var data = e.data;
          map.setView([data.lat, data.lng], data.z);
        })
        .default(function () {
          var fmt = hashable.format.path();
          var path = fmt.parse(window.location.hash);
          return {
            z: path.z || map.getZoom(),
            lng: path.lng || map.getCenter().lng,
            lat: path.lat || map.getCenter().lat
          };
        })
        .enable()
        .check();

      map.on('moveend', function () {
        var center = map.getCenter();
        var fmt = hashable.format.path();
        var p = precision(hash.data().z);
        hash.update({lng: center.lng.toFixed(p), lat: center.lat.toFixed(p)});
        var formattedData = fmt(hash.data());
        window.history.replaceState({}, null, '#' + formattedData);
      })
        .on('zoomend', function () {
          hash.update({z: map.getZoom()});
          var fmt = hashable.format.path();
          var formattedData = fmt(hash.data());
          window.history.replaceState({}, null, '#' + formattedData);
        });

      var precision = function (z) {
        return Math.max(0, Math.ceil(Math.log(z) / Math.LN2));
      };
    }
});

module.exports = MapControl;

module.exports.map = function(element, options) {
    return new MapControl(element, options);
};
