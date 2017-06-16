describe('Routing Test', function () {
  var el;
  var map;

  before(function (done) {
    L.Mapzen.apiKey = 'mapzen-cstHyBQ';
    done();
  })

  describe('Basic Routing Check', function () {

    it('checks routing component is initialized.', function (done) {
      var routingControl = L.Mapzen.routing.control({
        router: L.Mapzen.routing.router({costing: 'bicycle'})
      });
      done();
    });

    it('checks routing component with both apikey and option is initialized', function (done) {
      var routingControl = L.Mapzen.routing.control({
        router: L.Mapzen.routing.router('mapzen-cstHyBQ', {costing: 'bicycle'})
      });
      done();
    });

  })
});
