var L = require('leaflet');
var BasemapStyles = require('./basemapStyles');

var SceneHelper = L.Class.extend({
  options: {
    sceneFile: BasemapStyles.BubbleWrap,
    apiKey: null,
    transit: false,
    language: 'en'
  },
  initialize: function (options) {
    var opt = L.extend({}, L.Map.prototype.options, options);
    this.options.apiKey = this.options.apiKey || L.Mapzen.apiKey;
  },

  buildScene: function() {
    return {
      import: this.options.sceneFile,
      global: {
        sdk_mapzen_api_key: this.options.apiKey,
        ux_language: this.options.language,
        transit: this.options.transit
      }
    };
  }

});


module.exports = SceneHelper;

module.exports.sceneHelper = function (options) {
  return new SceneHelper(options);
};
