
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

  var map;

  WebMap = {

    init: function(domEl, centerLatLon, zoom) {
      map = L.map(domEl).setView(centerLatLon, zoom);
      return this;
    },

    setupScene: function(scene) {
      var layer = Tangram.leafletLayer({
        scene: scene,
        attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
      });
      layer.addTo(map);
    },

    domTest: function() {
      var testEl = document.createElement('div');
      testEl.id = 'testEl'
      testEl.innerHTML = 'Hello world'
      document.body.appendChild(testEl);
    }
  }

  return WebMap;

}))