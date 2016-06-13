/* eslint-disable */
before(function () {
  console.log('Leaflet version: ' + L.version);
});

describe('leaflet', function () {
  var el;
  var webmap;
  var windowHistory;

  before('initialize map', function () {
    el = document.createElement('div');
    // DOM needs to be visible: appended to the body and have dimensions
    // in order for .focus() to work properly
    el.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%;';
    document.body.appendChild(el);
    windowHistory = window.history;
    webmap = L.Mapzen.map(el);
    webmap.setView([51.505,-0.09], 13);
  });

  it('check which Leaflet version it is', function () {
    expect(L.version).to.equal('0.7.7');
  });

  it('checks that hash for coord is working', function () {
    L.Mapzen.hash(webmap);
      var zoom = webmap.getZoom();
      var center = webmap.getCenter();

      var getPrecision = function (z) {
        return Math.max(0, Math.ceil(Math.log(z) / Math.LN2));
      }
      var precision = getPrecision(zoom);

      var hashLat = center.lat.toFixed(precision);
      var hashLng = center.lng.toFixed(precision);
      expect(window.location.hash).to.equal('#lat='+hashLat+'&lng='+hashLng+'&z='+zoom);
  });

  it('checks that states are not pushed to history', function () {
    webmap.setView([51.505, -2.09], 13);
    expect(window.history).to.equal(windowHistory);
  });
});
