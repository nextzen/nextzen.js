describe('Search Test', function () {
  var el;
  var map;

  before(function (done) {
    L.Mapzen.apiKey = 'mapzen-cstHyBQ';
    done();
  })

  describe('Basic Geocoder Check', function () {
    it('checks geocoder is initialized', function (done) {
      var geocoder = L.Mapzen.geocoder();
      done();
    });

    it('checks geocoder with api key is initialized', function (done) {
      var geocoder = L.Mapzen.geocoder('mapzen-cstHyBQ');
      done();
    });

    it('checks geocoder with option is initialized', function (done) {
      var geocoder = L.Mapzen.geocoder({
        autocomplete: false,
        attribution: 'test attribution'
      });
      done();
    });

    it('checks geocoder with both api key and option is initialized', function (done) {
      var geocoder = L.Mapzen.geocoder('mapzen-cstHyBQ', {
        autocomplete: false
      });
      done();
    });
  })
});
