var Map = (function(){

  var map;
  var currentLayer = L.layerGroup();
  var markerLayer = L.layerGroup();
  var routeLayer = L.layerGroup();
  var markerIcon;
  var startMarkerIcon;
  var currentMarkerIcon;


  var _init = function() {
    
    map = L.map(document.getElementById('map'), {
      zoomControl:false
    });
    var layer = Tangram.leafletLayer({
      scene: 'https://cdn.rawgit.com/tangrams/cinnabar-style-more-labels/gh-pages/cinnabar-style-more-labels.yaml',
      attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
    });

    // var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    map.setView([40.7099948, -74.0298132], 12);

    markerIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjEwIDE2IDUwIDUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDEwIDE2IDUwIDUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojQ0NDQ0NDO3N0cm9rZTojMDAwMDAwO3N0cm9rZS1taXRlcmxpbWl0OjEwO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzEuNiwxOC41Yy04LjksMC4xLTE2LjEsNy40LTE2LjEsMTYuM2MwLjEsOC45LDE2LjQsMjguNywxNi40LDI4LjdzMTUuOS0yMCwxNS45LTI5LjENCglDNDcuOCwyNS42LDQwLjUsMTguNCwzMS42LDE4LjV6IE0zNS43LDM3LjRjLTIsMi01LjQsMi03LjQsMGMtMi0yLTItNS40LDAtNy40czUuNC0yLDcuNCwwQzM3LjcsMzIsMzcuNywzNS40LDM1LjcsMzcuNHoiLz4NCjwvc3ZnPg0K',
      iconSize:[45, 57]
    });
    currentMarkerIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCA1MCA1MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTAgNTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtvcGFjaXR5OjAuNTtmaWxsOiNBMTMxMkY7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9DQoJLnN0MXtvcGFjaXR5OjAuODtmaWxsOiNBMTMxMkY7ZW5hYmxlLWJhY2tncm91bmQ6bmV3ICAgIDt9DQo8L3N0eWxlPg0KPHBhdGggaWQ9IlhNTElEXzJfIiBjbGFzcz0ic3QwIiBkPSJNMzkuMywzOS4zYy03LjcsNy43LTIwLjksNy43LTI4LjUsMHMtNy43LTIwLjksMC0yOC41czIwLjktNy43LDI4LjUsMFM0Ni45LDMxLjYsMzkuMywzOS4zeiIvPg0KPHBhdGggaWQ9IlhNTElEXzFfIiBjbGFzcz0ic3QwIiBkPSJNMzQuNiwzNC42Yy01LjIsNS4yLTE0LjEsNS4yLTE5LjIsMHMtNS4yLTE0LjEsMC0xOS4yczE0LjEtNS4yLDE5LjIsMFMzOS44LDI5LjUsMzQuNiwzNC42eiIvPg0KPHBhdGggaWQ9IlhNTElEXzNfIiBjbGFzcz0ic3QxIiBkPSJNMzAuNCwzMC40Yy0yLjgsMi44LTgsMi44LTEwLjgsMHMtMi44LTgsMC0xMC44czgtMi44LDEwLjgsMFMzMy4yLDI3LjYsMzAuNCwzMC40eiIvPg0KPC9zdmc+DQo=',
      iconSize: [35,35]
    });

    startMarkerIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMCAzMCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzAgMzA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNDRENDQ0M7c3Ryb2tlOiMzMzMzMzM7c3Ryb2tlLW1pdGVybGltaXQ6MTA7fQ0KPC9zdHlsZT4NCjxwYXRoIGlkPSJYTUxJRF8yXyIgY2xhc3M9InN0MCIgZD0iTTIwLjQsMjAuNGMtMi45LDIuOS03LjksMi45LTEwLjgsMHMtMi45LTcuOSwwLTEwLjhzNy45LTIuOSwxMC44LDBTMjMuMywxNy41LDIwLjQsMjAuNHoiLz4NCjwvc3ZnPg0K',
      iconSize: [20,20]
    });

    layer.addTo(map);
    currentLayer.addTo(map);
    routeLayer.addTo(map);
    markerLayer.addTo(map);
  };

  var _setCurrentPoint = function(pos) {
    var newCurrentLocation = {
      name: 'Current Location',
      lat: pos.lat,
      lon: pos.lon
    }
    var center = L.latLng(newCurrentLocation.lat, newCurrentLocation.lon);

    currentLayer.addLayer(L.marker(center, {icon: currentMarkerIcon}));
    map.setView(center, 14);
  };

  var _addMarker = function(mrkr) {
    markerLayer.clearLayers();
    var marker = L.marker([mrkr.lat,mrkr.lon], {icon: markerIcon});
    markerLayer.addLayer(marker);
    map.setView(marker.getLatLng(),14);
  };

  var _clearMap = function() {
    console.log('clearing');
    markerLayer.clearLayers();
    currentLayer.clearLayers();
    routeLayer.clearLayers();
  }

  var _addRouteLayer = function(routes, startPoint, destPoint) {
    markerLayer.clearLayers();
    var marker = L.marker([destPoint.lat, destPoint.lon], {icon: markerIcon});
    markerLayer.addLayer(marker);
    markerLayer.addLayer(L.marker([startPoint.lat, startPoint.lon], {icon: startMarkerIcon}));
    
    routeLayer.clearLayers();
    var polylineRoute = L.polyline(routes, {color:'#32CAD6',opacity:1});
    routeLayer.addLayer(polylineRoute);
    map.fitBounds(polylineRoute.getBounds(),{
      paddingTopLeft: [0,430],
      paddingBottomRight : [0,30]
    });
  }
  
  var _setView = function(latLng,z) {
    map.setView(latLng,z);
  }

  var _getHash = function() {
    var _latLng = map.getCenter();
    var _zoom = map.getZoom();

    return ({
      latLng: _latLng,
      zoom: _zoom
    })
  }

  return {
    init : _init,
    setView: _setView,
    setCurrentPoint: _setCurrentPoint,
    addMarker: _addMarker,
    clear: _clearMap,
    addRouteLayer: _addRouteLayer,
    getHash: _getHash
  };
})();


module.exports = Map;