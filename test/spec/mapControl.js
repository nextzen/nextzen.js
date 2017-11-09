describe('Map Control Test', function () {

  var el;
  var testMap;
  var spy;
  var hasWebGL;

  before(function () {
    el = document.createElement('div');
    el.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%;';
    document.body.appendChild(el);
    L.Mapzen.apiKey = 'mapzen-cstHyBQ';
    testMap = L.Mapzen.map(el);
    spy = sinon.spy();
    testMap.addEventListener('tangramloaded', spy);
    testMap.setView([51.505, -0.09], 13);
    hasWebGL = testMap._tangram._hasWebGL();

  });

  after(function () {
    el.parentNode.removeChild(el);
  })

  describe('Leaflet Versions', function () {
    it('check which Leaflet version it is', function () {
      expect(L.version).to.equal('1.2.0');
    });
  });


  describe('Tangram layer check', function () {
    it('checks default style is set.', function (done) {
      if (hasWebGL) {
        if (testMap.getTangramLayer()) done();
      } else {
        // skip test if webgl is not available
        done();
      }
    });
    // Tangram event is deprectaed; remove in v1.0
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
