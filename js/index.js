
(function (root, factory) {
  // Universal Module Definition (UMD)
  // via https://github.com/umdjs/umd/blob/master/templates/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(this, function () {
  'use strict';

  var map;

  var WebMap = {
    init: function (domEl, centerLatLon, zoom) {
      map = L.map(domEl).setView(centerLatLon, zoom);
      map.scrollWheelZoom = this._isThisIframed();
      return this;
    },

    setupScene: function (scene) {
      var layer = Tangram.leafletLayer({
        scene: scene,
        attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
      });
      layer.addTo(map);
    },

    _isThisIframed: function () {
      if(window.self !== window.top) return true;
      else return false;
    }
  };

  window.WebMap = WebMap;
}));
