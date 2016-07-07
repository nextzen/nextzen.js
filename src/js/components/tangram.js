// Tangram can't be bundled from source since it needs to be able to access a full copy of itself
// (either as a URL or full string of all source code) in order to load itself into web workers
// This script injects the Tangram with script tag, so that Tangram doesn't need to be included with outside tag
var L = require('leaflet');
var TangramLayer = (function () {

  var tangramLayerInstance;

  var tangramLayer = {

    init: function(_map, _options) {

      this.map = _map;
      this.options = _options;
      // Start importing script as soon as Mapzen.js started
      // When there is no Tangram object available.
      if (typeof Tangram === 'undefined') {
        var tangramScriptURL = 'https://mapzen.com/tangram/0.8/tangram.min.js';
        this._importScript(tangramScriptURL);
      } else {
        // Not more than one Tangram instance is allowed.
        console.log('Tangram is already on the page.');
      }
      return this;
    },


    _setupScene: function() {
      // Set up scene when Tangram object is available
      if (typeof Tangram === 'undefined') {
        return window.setTimeout(this._setupScene.bind(this), 100);
      } else {
        if (this._hasWebGL()) {
          console.log('given scene:', this.options.scene);
          console.log('using scene:', (this.options.scene || L.Mapzen.HouseStyles.BubbleWrap));
          Tangram.leafletLayer({
            scene: (this.options.scene || L.Mapzen.HouseStyles.BubbleWrap)
          }).addTo(this.map);
        } else {
          // When WebGL is not avilable
          console.log('WebGL is not available, falling back to OSM default tile.');
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          }).addTo(this.map);
        }
      }
    },

    _importScript: function(sSrc) {
      var oScript = document.createElement('script');

      oScript.type = 'text/javascript';
      oScript.onerror = this._loadError;
      oScript.onload = this._setupScene.bind(this);
      if (document.currentScript) document.currentScript.parentNode.insertBefore(oScript, document.currentScript);
      // If browser doesn't support currentscript position
      // insert script inside of head
      else document.getElementsByTagName('head')[0].appendChild(oScript);
      oScript.src = sSrc;
    },

    _loadError: function(oError) {
      console.log(oError);
      throw new URIError('The script ' + oError.target.src + ' is not accessible.');
    },

    _hasWebGL: function() {
      try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (x) {
        return false;
      }
    }
  };

  return {
    addTo: function (map, options) {
      if (!tangramLayerInstance) {
        tangramLayerInstance = tangramLayer.init(map, options);
      } else {
        console.log('Only one Tangram map on page can be drawn. Please look at https://github.com/tangrams/tangram/issues/350');
      }
      return tangramLayerInstance;
    }
  };

})();

module.exports = TangramLayer;
