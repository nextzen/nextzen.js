describe('Map Control Test', function () {

  var el;
  var testMap;
  var spy;
  var hasWebGL;

  before(function () {
    el = document.createElement('div');
    el.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%;';
    document.body.appendChild(el);
    testMap = L.Mapzen.map(el);
    spy = sinon.spy();
    testMap.addEventListener('tangramloaded', spy);
    testMap.setView([51.505, -0.09], 13);

    hasWebGL = L.Mapzen._tangram()._hasWebGL();

  });

  after(function () {
    el.parentNode.removeChild(el);
  })

  describe('Leaflet Versions', function () {
    it('check which Leaflet version it is', function () {
      expect(L.version).to.equal('1.0.1');
    });
  });


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
        if (hasWebGL) {
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
        if(hasWebGL) {
          if(spy.called) done();
          else return setTimeout(tangramEventCheck.bind(this), 200);
        } else done();
      }
      tangramEventCheck();
    })

  })

});
