'use strict';
var MapControl = L.Map.extend({

  // overriding Leaflet's map initializer
  initialize: function (element, options) {
    L.Map.prototype.initialize.call(this, element, options);

    // overriding double click behaviour to zoom up where it is clicked
    this.doubleClickZoom.disable();
    this.on('dblclick', function (e) {
      this.setView(e.latlng, this.getZoom() + 1);
    });
    this._checkConditions(false);
  },

  setupScene: function (scene) {
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
  },

  _checkConditions: function (force) {
    if (this._isThisIframed()) {
      // do not scroll zoom when it is iframed
      this.scrollWheelZoom = false;
      var anchors = document.querySelectorAll('a');

      for (var i = 0, j = anchors.length; i < j; i++) {
        var el = anchors[i];
        // Only set target when not explicitly specified
        // to avoid overwriting intentional targeting behavior
        // Unless the force parameter is true, then targets of
        // '_blank' are forced to to be '_top'
        if (!el.target || (force === true && el.target === '_blank')) {
          el.target = '_top';
        }
      }
    }
    // do not show zoom control buttons on mobile
    // need to add more check to detect touch device
    if ('ontouchstart' in window) {
      this._disableZoomControl();
    }
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
    return (window.self === window.top);
  },

  _disableZoomControl: function () {
    this.zoomControl._container.style.display = 'none';
  }
});

module.exports = MapControl;

module.exports.map = function (element, options) {
  return new MapControl(element, options);
};
