var React = require('react');
var RouteHandler = require('react-router').RouteHandler;

require('ratchet');
require('./css/main.scss');

var CurrentLocation = require('./CurrentLocation/CurrentLocation');
var SearchBox = require('./Search/SearchBox');
var RouteWindow = require('./Routing/RouteWindow');
var RouteButton = require('./Routing/RouteButton');

var Main = React.createClass({

  getInitialState: function(){
    return{
      // markerLyaer is being mutated, not the way react recommends
      currentPoint : null,
      startPoint : null,
      destPoint : null,
      poiMarkers:[],
      currentLayer : L.layerGroup(),
      markerLayer : L.layerGroup([L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.')]),
      routeLayer : L.layerGroup(),
      mode : "search"
    }

  },
  setStartPoint: function(mrkr){
    this.setState({startPoint:mrkr},function(){
    });
  },

  setCurrentPoint: function(pos){
    
    var newCurrentLocation = {
      name : "Current location",
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }

    this.setState({
      currentPoint : newCurrentLocation,
      startPoint : newCurrentLocation
    },function(){
      var center = L.latLng(pos.coords.latitude,pos.coords.longitude);
      this.state.currentLayer.clearLayers();
      this.state.currentLayer.addLayer(L.circleMarker(center), 3, {
        color: '#00f',
        opacity:1,
        fillColor: '#00f',
        fillOpacity: 0.8,

      });
      this.map.setView(center,14);
    });

  },

  addMarker: function(mrkr){

    this.state.markerLayer.clearLayers();
    var marker = L.marker([mrkr.lat,mrkr.lon]);
    //replace not to mutate state directly
    this.state.markerLayer.addLayer(marker);
    
    this.map.setView(marker.getLatLng(),14);
    this.setState({
      destPoint: mrkr
    });
  },
  addPOIMarkers: function(mrkrs){
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
      marker.on('click', function (e) {
        self.setState({
          destPoint:{
            name : this.name,
            lat : this.getLatLng().lat,
            lon : this.getLatLng().lng
          }
        });
      });

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
  clearMap : function(){
    this.state.markerLayer.clearLayers();
    this.state.currentLayer.clearLayers();
    this.state.routeLayer.clearLayers();
    this.setState({
      startPoint:{},
      destPoint:{}
    });
  },
  addRouteLayer : function(routes){
    this.state.markerLayer.clearLayers();
    var marker = new L.marker([this.state.destPoint.lat, this.state.destPoint.lon]);
    this.state.markerLayer.addLayer(marker);
    this.state.markerLayer.addLayer(L.circleMarker(L.latLng(this.state.startPoint.lat,this.state.startPoint.lon)), 3, {
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
  setMapMode : function(mapMode){
    this.setState({mode:mapMode});
  },
  createMap: function (element) {
    //React.render(<Map lat="40.758" lon="-73.9174" zoom="4" />,document.body);
    var map = L.map(element,{
      zoomControl:false
    });

    // var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //   attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);

    //loading scene yaml
     var layer = Tangram.leafletLayer({
         scene: 'https://cdn.rawgit.com/tangrams/multiverse/gh-pages/styles/tangram-toner.yaml',//sceneYaml,
         attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
     });
    layer.addTo(map);
    return map;
    },

    setupMap: function () {
      this.map.setView([40.728, -73.99], 12);
      this.setMapMode("search");
    },

    componentDidMount: function () {
        if (this.props.createMap) {
            this.map = this.props.createMap(this.getDOMNode());
        } else {
            this.map = this.createMap(document.getElementById('map'));
        }
        this.setupMap();
        this.state.markerLayer.addTo(this.map);
        this.state.currentLayer.addTo(this.map);
        this.state.routeLayer.addTo(this.map);
    },

    render: function () {
      if(this.state.mode == "search"){
      return (
        <div id="mapContainer">
          <div id="map"></div>
          <div className = "searchBoxContainer">
          <SearchBox
            addMarker = {this.addMarker}
            addPOIMarkers = {this.addPOIMarkers}
            currentPoint = {this.state.currentPoint}/>
          </div>
          <RouteButton 
          destPoint= {this.state.destPoint} 
          addRouteLayer = {this.addRouteLayer}
          setMapMode = {this.setMapMode}
          mode = {this.state.mode}/>
          <CurrentLocation
            setCurrentLocation = {this.setCurrentPoint} />
          <RouteHandler />
        </div>
      );
    }else{
        return(
          <div id="mapContainer">
          <div id="map"></div>
          <RouteWindow 
            startPoint = {this.state.startPoint}
            currentPoint ={this.state.currentPoint}
            destPoint = {this.state.destPoint}
            clearMap = {this.clearMap}
            addMarker = {this.addMarker}
            setStartPoint = {this.setStartPoint}
            addRouteLayer = {this.addRouteLayer}
            setMapMode = {this.setMapMode}/>
        </div>
        );
      }
    }
});

module.exports = Main;
