import React from 'react';
var cookie = require('react-cookie');

var Actions = require('../../actions');
var store = require('../../reducer');


var Map = React.createClass({

  getInitialState: function(){
    return {
      currentPoint : cookie.load('currentLocation') || {},
      poiMarkers:[],
      currentLayer : L.layerGroup(),
      markerLayer : L.layerGroup([L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.')]),
      routeLayer : L.layerGroup()
    }
  },

  createMap: function(element) {
    var map = L.map(element,{
      zoomControl:false
    });
  //loading scene yaml
     var layer = Tangram.leafletLayer({
         scene: 'https://cdn.rawgit.com/tangrams/multiverse/gh-pages/styles/blue-gray6.yaml',//sceneYaml,
         attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
     });
    layer.addTo(map);
    return map;
  },

  setupMap: function(point) {

    if (this.props.createMap) {
      this.map = this.props.createMap(this.getDOMNode());
    } else {
      this.map = this.createMap(document.getElementById('map'));
    }
    this.map.setView([point.lat, point.lon], 12);
  },

  setCurrentPoint: function(pos) {
    var newCurrentLocation = this.props.currentPoint;
    var center = L.latLng(newCurrentLocation.lat, newCurrentLocation.lon);

    this.state.currentLayer.clearLayers();
    this.state.currentLayer.addLayer(L.circleMarker(center), 3, {
      color: '#00f',
      opacity:1,
      fillColor: '#00f',
      fillOpacity: 0.8,
    });

    this.map.setView(center,14);
  },

  addMarker: function(mrkr){

    this.state.markerLayer.clearLayers();
    var marker = L.marker([mrkr.lat,mrkr.lon]);
    this.state.markerLayer.addLayer(marker);
    this.map.setView(marker.getLatLng(),14);
  },

  addPOIMarkers: function(mrkrs) {
    this.state.markerLayer.clearLayers();
    var i;
    var self = this;
    var minLat, minLon, maxLat, maxLon;
    for(i = 0; i<mrkrs.length; i++){
      if(i < 1){
        minLat = mrkrs[i].lat;
        minLon = mrkrs[i].lon;
        maxLat = mrkrs[i].lat;
        maxLon = mrkrs[i].lon;
      }

      var marker = new L.marker([mrkrs[i].lat,mrkrs[i].lon]).bindPopup(mrkrs[i].name);
      marker.name = mrkrs[i].name;

      if(mrkrs[i].lat < minLat) minLat = mrkrs[i].lat;
      if(mrkrs[i].lat > maxLat) maxLat = mrkrs[i].lat;
      if(mrkrs[i].lon < minLon) minLon = mrkrs[i].lon;
      if(mrkrs[i].lon > maxLon) maxLon = mrkrs[i].lon;

      this.state.markerLayer.addLayer(marker);
    }
    this.map.fitBounds([[minLat,minLon],[maxLat,maxLon]],{
      paddingTopLeft: [20,150],
      paddingBottomRight : [20,30]
    });
  },

  addRouteLayer: function(routes) {
    this.state.markerLayer.clearLayers();
    var marker = new L.marker([this.props.destPoint.lat, this.props.destPoint.lon]);
    this.state.markerLayer.addLayer(marker);
    this.state.markerLayer.addLayer(L.circleMarker(L.latLng(this.props.startPoint.lat,this.props.startPoint.lon)), 3, {
      color: '#32CAD6',
      opacity:1,
      fillColor: '#32CAD6',
      fillOpacity: 0.8,
    });
    this.state.routeLayer.clearLayers();
    var polylineRoute = L.polyline(routes, {color:'#32CAD6',opacity:1});
    this.state.routeLayer.addLayer(polylineRoute);
    this.map.fitBounds(polylineRoute.getBounds(),{
      paddingTopLeft: [0,150],
      paddingBottomRight : [0,30]
    });
    this.render();
  },

  clearMap: function() {
    this.state.markerLayer.clearLayers();
    this.state.currentLayer.clearLayers();
    this.state.routeLayer.clearLayers();
  },
  componentDidMount: function () {

  //check cookie if there is anything that map can position it self
  var cookieLocation = cookie.load('currentLocation');
  if(cookieLocation) store.dispatch(Actions.updateCurrentPointAction(cookieLocation));
  store.dispatch(Actions.setMapModeAction('default'));

  //when there is no cookie, nyc is default
  this.setupMap(cookieLocation || {lat: 40.758224, lon: -73.917404});
  this.state.markerLayer.addTo(this.map);
  this.state.currentLayer.addTo(this.map);
  this.state.routeLayer.addTo(this.map);
  },

  render: function() {
    return (
    <div id="map"></div>
    );
  }
});

module.exports = Map;