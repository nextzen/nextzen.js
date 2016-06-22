describe('Map Hash Test', function () {
  var el;

  beforeEach(function () {
    el = document.createElement('div');
    document.body.appendChild(el);
  });

  afterEach(function () {
    el.parentNode.removeChild(el);
  })


  describe('Leaflet Versions', function () {
    it('check which Leaflet version it is', function () {
      expect(L.version).to.equal('0.7.7');
    });
  });

  describe('Hash Working', function () {
    it('checks that hash for coord is working', function () {
      var map = L.Mapzen.map(el);
      map.setView([51.505, -0.09], 13);
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
  })
});
