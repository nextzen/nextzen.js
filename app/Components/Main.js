var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var CurrentLocation = require('./CurrentLocation');
var SearchBox = require('./SearchBox');
var RouteWindow = require('./Route');

require('leafletCss');
require('ratchet');
require('./css/main.css');


var RouteButton = React.createClass({
  route : function(){
    this.props.setMapMode("route");
  },
  render : function(){
    return(
      <div className="sideBtn" onClick = {this.route}>
        <div className="route-icon"></div>
      </div>
    );
  }
});

var Main = React.createClass({

  getInitialState: function(){
    return{
      // markerLyaer is being mutated, not the way react recommends
      currentPoint : {
        //hard coded! what will be the best?
        name : "Current location",
        lat: 0,
        lon: 0
      },
      startPoint : {
        name : "Choose start location.",
        lat :  40.7410605,
        lon : -73.9896986
      },
      destMarker : {
        name : "Choose destination.",
        lat :  40.7410605,
        lon : -73.9896986
      },
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
      destMarker: mrkr
    });
  },
  addPOIMarkers: function(mrkrs){
    this.state.markerLayer.clearLayers();
    
    var i;
    var minLat = mrkrs[0].lat;
    var minLon = mrkrs[0].lon;
    var maxLat = mrkrs[0].lat;
    var maxLon = mrkrs[0].lon;

    var self = this;

    for(i =0; i<mrkrs.length; i++){
      var marker = new L.marker([mrkrs[i].lat,mrkrs[i].lon]);
      marker.name = mrkrs[i].name;
      marker.bindPopup(mrkrs[i].name);
      marker.on('click', function (e) {
        self.setState({
          destMarker:{
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
    this.map.fitBounds([[minLat,minLon],[maxLat,maxLon]]);
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
    var marker = new L.marker([this.state.destMarker.lat, this.state.destMarker.lon]);
    this.state.markerLayer.addLayer(marker);
    this.state.markerLayer.addLayer(L.circleMarker(L.latLng(this.state.startPoint.lat,this.state.startPoint.lon)), 3, {
      color: '#0ff',
      opacity:1,
      fillColor: '#0ff',
      fillOpacity: 0.8,
    });
    this.state.routeLayer.clearLayers();
    var polylineRoute = L.polyline(routes, {color:'red'});
    this.state.routeLayer.addLayer(polylineRoute);
    this.map.fitBounds(polylineRoute.getBounds());
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
         scene: 'https://cdn.rawgit.com/tangrams/carousel/gh-pages/traditional.yaml',//sceneYaml,
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
          destMarker= {this.state.destMarker} 
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
            destPoint = {this.state.destMarker}
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
