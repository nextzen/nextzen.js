'use strict';
module.exports = (function () {

  var map;

  var _hasWebGL = function () {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (x) {
      return false;
    }
  }

  var _isThisIframed = function () {
    if (window.self !== window.top) return true;
    else return false;
  }

  var mapControl = {

    init: function (domEl, centerLatLon, zoom) {
      map = new L.Map(domEl).setView(centerLatLon, zoom);

      // overriding double click behaviour to zoom up where it is clicked
      map.doubleClickZoom.disable();
      map.on('dblclick', function (e) {
        map.setView(e.latlng, map.getZoom() + 1);
      });

      // do not activate scroll wheel zoom when map is iframed
      map.scrollWheelZoom = _isThisIframed();
      this._setupHash();

      map.setupScene = function (scene) {
        if (_hasWebGL()) {
          // adding tangram layer
          Tangram.leafletLayer({
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
      }

      return map;
    },

    _setupHash: function () {
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
  };

  return mapControl;

})();