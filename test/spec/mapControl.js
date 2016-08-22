describe('Map Control Test', function () {

  var el;
  var testMap;
  var spy;


  var _hasWebGL = function() {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (x) {
      return false;
    }
  }


  before(function () {
    el = document.createElement('div');
    el.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%;';
    document.body.appendChild(el);
    testMap = L.Mapzen.map(el);
    spy = sinon.spy();
    testMap.addEventListener('tangramloaded', spy);
    testMap.setView([51.505, -0.09], 13);

  });

  after(function () {
    el.parentNode.removeChild(el);
  })

  describe('Tangram layer check', function () {
    it('checks default style is set.', function (done) {

      // Give time to load Tangram script
      var count = 0;
      var checkTangramLayer = function () {
        var tangramLayer;
        testMap.eachLayer(function (layer) {
          if (layer.scene) tangramLayer = layer;
        });
        count++;
        if (_hasWebGL()) {
          if (tangramLayer === undefined && count < 40) return setTimeout(checkTangramLayer.bind(this), 200);
          else if (tangramLayer) done();
          else if (count >= 40) done(new Error('takes too long to load Tangram'))
        } else {
          done();
        }
      }
      checkTangramLayer();
    });

    it('checks Tangram Event', function (done) {
      var tangramEventCheck = function () {
        if(_hasWebGL())
          if(spy.called) done();
          else return setTimeout(tangramEventCheck.bind(this), 200);
        else done();
      }
      tangramEventCheck();
    })

  })

});
