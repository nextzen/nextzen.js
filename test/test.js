describe('leaflet', function () {
  var el;
  var map;
  var windowHistory;

  before('initialize map', function () {
    el = document.createElement('div');
    // DOM needs to be visible: appended to the body and have dimensions
    // in order for .focus() to work properly
    el.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%;';
    document.body.appendChild(el);
    windowHistory = window.history;
    map = L.Mapzen.map(el);
    map.setView([51.505, -0.09], 13);
  });

  it('check which Leaflet version it is', function () {
    expect(L.version).to.equal('0.7.7');
  });


  it("checks default style is set.", function(done){

    // Give time to load Tangram script
    setTimeout(function() {
      if (map._hasWebGL()) {
        var tangramLayer = false;

        map.eachLayer( function(layer) {
          if (layer.scene) tangramLayer = true;
        });

        if(tangramLayer) done();
        else done(err);

      } else {
        done();
      }
    }, 1500);
  });

  it('checks that hash for coord is working', function () {
    L.Mapzen.hash({
      map: map
    });
    var zoom = map.getZoom();
    var center = map.getCenter();

    var getPrecision = function (z) {
      return Math.max(0, Math.ceil(Math.log(z) / Math.LN2));
    };
    var precision = getPrecision(zoom);

    var hashLat = center.lat.toFixed(precision);
    var hashLng = center.lng.toFixed(precision);
    expect(window.location.hash).to.equal('#lat=' + hashLat + '&lng=' + hashLng + '&z=' + zoom);
  });

  it('checks that states are not pushed to history', function () {
    map.setView([51.505, -2.09], 13);
    expect(window.history).to.equal(windowHistory);
  });
});
