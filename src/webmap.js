'use strict';

module.exports = (function WebMap () {
  var map;
  var hashable = require('hashable');

  var webMapObj = {
    init: function (domEl, centerLatLon, zoom) {
      map = L.map(domEl).setView(centerLatLon, zoom);

      // overriding double click behaviour to zoom up where it is clicked
      map.doubleClickZoom.disable();
      map.on('dblclick', function (e) {
        map.setView(e.latlng, map.getZoom() + 1);
      });

      // do not activate scroll wheel zoom when map is iframed
      map.scrollWheelZoom = this._isThisIframed();
      this._setupHash();

      return this;
    },

    _setupHash: function () {
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
        hash.update({lng: center.lng, lat: center.lat});
        var fmt = hashable.format.path();
        var formattedData = fmt(hash.data());
        window.history.replaceState({}, null, '#' + formattedData);
      })
        .on('zoomend', function () {
          hash.update({z: map.getZoom()});
          var fmt = hashable.format.path();
          var formattedData = fmt(hash.data());
          window.history.replaceState({}, null, '#' + formattedData);
        });
    },

    setupScene: function (scene) {
      if (this._hasWebGL()) {
        // adding tangram layer
        var layer = Tangram.leafletLayer({
          scene: scene,
          attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
        }).addTo(map);
      } else {
        // adding osm default tile layer for
        console.log('WebGL is not available, falling back to OSM default tile.');
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(map);
      }
    },

    getLeafletMap: function () {
      return map;
    },

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
    }
  };

  return webMapObj;
})();
