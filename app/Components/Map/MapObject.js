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
         scene: 'https://cdn.rawgit.com/tangrams/cinnabar-style-more-labels/gh-pages/cinnabar-style-more-labels.yaml',
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

  var _addMarker = function(mrkr) {
    markerLayer.clearLayers();
    var marker = L.marker([mrkr.lat,mrkr.lon]);
    markerLayer.addLayer(marker);
    map.setView(marker.getLatLng(),14);
  };

  var _clearMap = function() {
    markerLayer.clearLayers();
    currentLayer.clearLayers();
    routeLayer.clearLayers();
  }

  var _addRouteLayer = function(routes, startPoint, destPoint) {
    markerLayer.clearLayers();
    console.log('map object level');
    console.log(startPoint);
    console.log(destPoint);
    var marker = new L.marker([destPoint.lat, destPoint.lon]);
    markerLayer.addLayer(marker);
    markerLayer.addLayer(L.circleMarker(L.latLng(startPoint.lat, startPoint.lon)), 3, {
      color: '#32CAD6',
      opacity:1,
      fillColor: '#32CAD6',
      fillOpacity: 0.8,
    });
    
    routeLayer.clearLayers();
    var polylineRoute = L.polyline(routes, {color:'#32CAD6',opacity:1});
    routeLayer.addLayer(polylineRoute);
    map.fitBounds(polylineRoute.getBounds(),{
      paddingTopLeft: [0,150],
      paddingBottomRight : [0,30]
    });
  }

  return {
    init : _init,
    setCurrentPoint: _setCurrentPoint,
    addMarker: _addMarker,
    clearMap: _clearMap,
    addRouteLayer: _addRouteLayer
  };
})();


module.exports = MapObject;