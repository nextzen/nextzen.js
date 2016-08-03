describe('Map Control Test', function () {
  var el;

  beforeEach(function () {
    el = document.createElement('div');
    el.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%;';
    document.body.appendChild(el);
  });

  afterEach(function () {
    el.parentNode.removeChild(el);
  })

  describe('Tangram check', function () {
    it('checks default style is set.', function (done) {
      var _hasWebGL = function() {
        try {
          var canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (x) {
          return false;
        }
      }
      var thisMap = L.Mapzen.map(el);
      // Give time to load Tangram script
      var count = 0;

      var checkTangramLayer = function () {
        var tangramLayer;
        thisMap.eachLayer(function (layer) {
          if (layer.scene) tangramLayer = layer;
        });
        count++;
        if (_hasWebGL()) {
          if (tangramLayer === undefined && count < 20) return setTimeout(checkTangramLayer.bind(this), 200);
          else if (tangramLayer) done();
          else if (count >= 20) done(new Error('takes too long to load Tangram'))
        } else {
          done();
        }
      }

      checkTangramLayer();

    });
  })
});
