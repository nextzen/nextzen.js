'use strict';
var L = require('leaflet');
var tangram = require('./tangram');

var MapControl = L.Map.extend({
  options: {
    attributionText: '<a href="https://mapzen.com">Mapzen</a> - <a href="https://www.mapzen.com/rights">Attribution</a>, Data ©<a href="https://openstreetmap.org/copyright">OSM</a> contributors'
  },
  // overriding Leaflet's map initializer
  initialize: function (element, options) {
    L.Map.prototype.initialize.call(this, element, L.extend({}, L.Map.prototype.options, options));
    // Adding Mapzen attribution to Leaflet
    if (this.attributionControl) {
      this.attributionControl.setPrefix('');
      this.attributionControl.addAttribution(this.options.attributionText);
      this.attributionControl.addAttribution('<a href="http://leafletjs.com/">Leaflet</a>');
    }
    // Set Icon path manually
    L.Icon.Default.imagePath = this._getImagePath();

    // overriding double click behaviour to zoom up where it is clicked
    this.doubleClickZoom.disable();
    this.on('dblclick', function (e) {
      this.setView(e.latlng, this.getZoom() + 1);
    });
    this._checkConditions(false);

    // Set up scene when Tangram script is injected
    // If there is already Tangram object available, just set up scene.
    if (typeof Tangram === 'undefined') L.DomEvent.on(tangram.scriptEl, 'load', this._setupScene, this);
    else this._setupScene();
  },

  _getImagePath: function () {
    // Modified Leaflet's Image Path function
    var scripts = document.getElementsByTagName('script');
    var mapzenRe = /[\/^]mapzen[\-\._]?([\w\-\._]*)\.js\??/;

    var i, len, src, matches, path;

    for (i = 0, len = scripts.length; i < len; i++) {
      src = scripts[i].src;
      matches = src.match(mapzenRe);

      if (matches) {
        path = src.split(mapzenRe)[0];
        return (path ? path + '/' : '') + 'images';
      }
    }
  },

  _setupScene: function () {
    if (this._hasWebGL()) {
      console.log('given scene:', this.options.scene);
      console.log('using scene:', (this.options.scene || L.Mapzen.HouseStyles.BubbleWrap));
      Tangram.leafletLayer({
        scene: (this.options.scene || L.Mapzen.HouseStyles.BubbleWrap)
      }).addTo(this);
    } else {
      // When WebGL is not avilable
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
