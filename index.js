
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


  WebMap = {

    init: function() {
      return 2;
    },

    domTest: function() {
      var testEl = document.createElement('div');
      testEl.id = 'testEl'
      testEl.innerHTML = 'Hello world'
      document.body.appendChild(testEl);
    },

    draw: function() {
      var map = L.map('map');
        var layer = Tangram.leafletLayer({
            scene: 'bubble-wrap.yaml',
            attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
        });
        layer.addTo(map);
        map.setView([40.70531887544228, -74.00976419448853], 15);
        return map.getZoom();
    }
  }

  return WebMap;
}))