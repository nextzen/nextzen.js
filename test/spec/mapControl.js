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

  describe('Tangram Version', function () {
    // Mapzen Basemap styles require Tangram version number above
    it('check Tangram version is above 0.13.1', function (done) {

      // House styles requires Tangram > 0.13.1
      var checkVersionNumber = function(vNum) {
        var requiredTangramVersionNumber = '0.13.1';
        var requiredVersionNums = requiredTangramVersionNumber.split('.');
        var vNums = vNum.split('.');
        vNums[0] = vNums[0].substring(1);
        console.log(vNums[0])
        if (Number(vNums[0]) >= Number(requiredVersionNums[0]) && Number(vNums[1]) >= Number(requiredVersionNums[1]) && Number(vNums[2]) >= Number(requiredVersionNums[2])) {
          return true;
        } else {
          return false;
        }
      }

      var count = 0;
      var checkTangramVersionNumber = function () {
        count++;
        if (hasWebGL) {
            if (checkVersionNumber(L.Mapzen._tangram().version)) done();
            else done(new Error('Tangram version is not met with required version number.'));
        } else {
          done();
        }
      }
      checkTangramVersionNumber();
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
