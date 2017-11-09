'use strict';
var L = require('leaflet');


var MapControl = L.Map.extend({
  // L.Evented is present in Leaflet v1+
  // L.Mixin.Events is legacy; was deprecated in Leaflet v1 and started
  // logging deprecation warnings in console in v1.1
  includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,
  options: {
    attribution: '© <a href="https://www.mapzen.com/rights">Mapzen</a>,  <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>, and <a href="https://www.mapzen.com/rights/#services-and-data-sources">others</a>',
    zoomSnap: 0,
    iframeDetection: false,
    worldCopyJump: true,
    _useTangram: true,
    apiKey: null
  },

  // overriding Leaflet's map initializer
  initialize: function (element, options) {
    var opts = L.Util.setOptions(this, options);
    L.Map.prototype.initialize.call(this, element, opts);

    this._setGlobalApiKey(opts);

    if (this.options._useTangram) {
      var tangramOptions = opts.tangramOptions || {};

      // debugTangram is deprecated; remove in v1.0
      if (this.options.debugTangram) {
        // tangramOptions = L.extend({}, tangramOptions, {debug: true});
        console.warn('Mapzen.js warning: `options.debugTangram` is deprecated.');
      }

      // As of v1.0, scene will need to be part of tangramOptions
      if (this.options.scene) {
        tangramOptions = L.extend({}, tangramOptions, {scene: this.options.scene});
        console.warn('Mapzen.js warning: `options.scene` is deprecated and will be removed in v1.0. Please use `options.tangramOptions.scene`.');
      }

      this._tangram = L.Mapzen._tangram(tangramOptions);
      this._tangramLayer = this._tangram.addTo(this);

      // tangramloaded event is deprecated; remove in v1.0
      var self = this;
      self._tangram.on('loaded', function (e) {
        self.fire('tangramloaded', {
          tangramLayer: e.layer,
          tangramVersion: e.version
        });
      });
    }

    this._setDefaultUIPositions();
    this._addAttribution();
    if (this.options.iframeDetection) this._checkConditions(false);
  },
  getTangramLayer: function () {
    return this._tangramLayer;
  },
  _setGlobalApiKey: function (opts) {
    this.options.apiKey = opts.apiKey || L.Mapzen.apiKey;

    // Update global (to be used by other services as needed)
    L.Mapzen.apiKey = this.options.apiKey;

    // Going forward, all API key checks should be performed on individual components
  },

  _checkConditions: function (force) {
    if (this._isThisIframed()) {
      // do not scroll zoom when it is iframed
      this.scrollWheelZoom.disable();
      this.scrollWheelZoom = false; // This is for Leaflet v1.0

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

  _isThisIframed: function () {
    return (window.self !== window.top);
  },

  _disableZoomControl: function () {
    if (this.options.zoomControl) {
      this.zoomControl._container.hidden = true;
    }
  },

  _setDefaultUIPositions: function () {
    if (this.options.zoomControl) {
      this.zoomControl.setPosition('bottomright');
    }
  },

  _addAttribution: function () {
    // Adding Mapzen attribution to Leaflet
    if (this.attributionControl) {
      var tempAttr = this.options.attributionText || this.options.attribution;
      this.attributionControl.setPrefix(tempAttr);
      this.attributionControl.addAttribution('<a href="http://leafletjs.com/">Leaflet</a>');
    }
  }
});

module.exports = MapControl;

module.exports.map = function (element, options) {
  return new MapControl(element, options);
};
