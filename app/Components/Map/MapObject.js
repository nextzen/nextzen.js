var MapObject = (function(){

  var map;
  var currentLayer = L.layerGroup();
  var markerLayer = L.layerGroup();
  var routeLayer = L.layerGroup();

  var _init = function() {
    map = L.map(document.getElementById('map'), {
      zoomControl:false
    });
     var layer = Tangram.leafletLayer({
         scene: 'https://cdn.rawgit.com/tangrams/multiverse/gh-pages/styles/blue-gray6.yaml',//sceneYaml,
         attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
     });
    map.setView([40.7099948, -74.0298132], 12);
    layer.addTo(map);
    currentLayer.addTo(map);
    routeLayer.addTo(map);
  };

  var _setCurrentPoint = function(pos) {
    var newCurrentLocation = {
      name: 'Current Location',
      lat: pos.lat,
      lon: pos.lon
    }
    var center = L.latLng(newCurrentLocation.lat, newCurrentLocation.lon);

    currentLayer.addLayer(L.circleMarker(center), 3, {
      color: '#00f',
      opacity:1,
      fillColor: '#00f',
      fillOpacity: 0.8,
    });

    map.setView(center, 14);
  };

  return {
    init : _init,
    setCurrentPoint: _setCurrentPoint
  };
})();


module.exports = MapObject;