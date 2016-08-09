// Tangram can't be bundled from source since it needs to be able to access a full copy of itself
// (either as a URL or full string of all source code) in order to load itself into web workers
// This script injects the Tangram with script tag, so that Tangram doesn't need to be included with outside tag
var L = require('leaflet');

var tangramLayerInstance;

var TangramLayer = L.Class.extend({
  includes: L.Mixin.Events,
  options: {
    fallbackTile: L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}),
    tangramURL: 'https://mapzen.com/tangram/0.8/tangram.min.js'
  },

  initialize: function () {
    // Start importing script
    // When there is no Tangram object available.
    if (typeof Tangram === 'undefined') {
      var tangramScriptURL = 'https://mapzen.com/tangram/0.8/tangram.min.js';
      this._importScript(tangramScriptURL);
    } else {
      // Not more than one Tangram instance is allowed.
      // console.log('Tangram is already on the page.');
    }
  },

  addTo: function (map) {
    if (this._hasWebGL()) {
      if (typeof Tangram === 'undefined') {
        return window.setTimeout(this.addTo.bind(this, map), 100);
      } else {
        console.log('given scene:', map.options.scene);
        console.log('using scene:', (map.options.scene || L.Mapzen.HouseStyles.BubbleWrap));
        var _layer = Tangram.leafletLayer({
          scene: (map.options.scene || L.Mapzen.HouseStyles.BubbleWrap)
        }).addTo(map);

        _layer.on('init', function () {
          this.fire('loaded', {
            layer: _layer
          });
        })
      }
    } else {
      if (map.options.fallbackTile) {
        console.log('WebGL is not available, falling back to fallbackTile option.');
        map.options.fallbackTile.addTo(map);
      } else {
      // When WebGL is not avilable
        console.log('WebGL is not available, falling back to OSM default tile.');
        this.options.fallbackTile.addTo(map);
      }
    }
  },
  // getLayer: function () {
  //   if (this._layerLoaded === true) {
  //     return this.layer;
  //   } else {
  //     console.log('Tangram is not loaded yet. Please use the loaded event');
  //   }
  // },
  _importScript: function (sSrc) {
    var oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.onerror = this._loadError;

    if (document.currentScript) document.currentScript.parentNode.insertBefore(oScript, document.currentScript);
    // If browser doesn't support currentscript position
    // insert script inside of head
    else document.getElementsByTagName('head')[0].appendChild(oScript);
    oScript.src = sSrc;
  },
  _loadError: function (oError) {
    console.log(oError);
    throw new URIError('The script ' + oError.target.src + ' is not accessible.');
  },
  _hasWebGL: function () {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (x) {
      return false;
    }
  }
});

module.exports = TangramLayer;

module.exports.tangramLayer = function () {
  // Tangram can't have more than one map on a browser context.
  if (!tangramLayerInstance) {
    tangramLayerInstance = new TangramLayer();
  } else {
    // console.log('Only one Tangram map on page can be drawn. Please look at https://github.com/tangrams/tangram/issues/350');
  }
  return tangramLayerInstance;
};
