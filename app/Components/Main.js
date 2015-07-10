//general problem : when vendors are managed in vendor folder, asset path throws err :( 
var React = require('react');
var L = require('leaflet');
var $ = require('jquery');
var polyline = require('polyline');
var RouteHandler = require('react-router').RouteHandler;
require('react-leaflet');
require('leafletCss');
require('ratchet');
require('./css/main.css');

//require('tangram');

var SearchBox = require('./SearchBox')

//should replace to tangram later


var SearchWhileRoute = React.createClass({

  render: function(){
    return (
    <div className = "searchBoxContainer">
      <SearchBox 
      value = {this.props.startPoint.name}
      addMarker = {this.props.setStartPoint} />
      <SearchBox 
          value = {this.props.destPoint.name}
          addMarker = {this.props.addMarker}/>
    </div>
    );
  }

})

var CurrentLocation = React.createClass({
  getCurrentLocation: function(){
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.props.setCurrentLocation);

    } else {
        //what will it show when browser doesn't support geolocation?
    }
    //this.props.setCurrentLocation()

  },
  render : function(){
    return(
      <div className="sideBtn secondary">
        <span className="icon icon-edit" onClick= {this.getCurrentLocation}></span>
      </div>
    );
  }
});


var RouteWindow = React.createClass({

  getInitialState : function(){
    return{
      //startPoint must be replaced current location // search result
      activeTab: ""
    }
  },
  //
  route: function(mode){
    //valhalla call form : https://valhalla.mapzen.com/route?json={%22locations%22:[{%22lat%22:39.42923221970601,%22lon%22:-76.6356897354126},{%22lat%22:39.30727282892593,%22lon%22:-76.77203178405762}],%22costing%22:%22auto%22}&api_key=valhalla-RfDii2g
    var serviceurl = "https://valhalla.mapzen.com/";
    var apikey = '&api_key=valhalla-RfDii2g';

    var transitM = mode || 'auto';
    var locs = [];
    locs.push({
      lat : this.props.startPoint.lat,
      lon : this.props.startPoint.lon
    });
    locs.push({
      lat : this.props.destPoint.lat,
      lon : this.props.destPoint.lon
    });

    var self = this;

    var params = JSON.stringify({
      locations: locs,
      costing: transitM
    });

    var routeUrl = serviceurl +  'route?json=' + params + apikey;
    $.get(routeUrl,function(data){
      
      var coord = polyline.decode(data.trip.legs[0].shape,6);
      self.props.addRouteLayer(coord);
    });
    //there must be better way to do this
    self.setState({
      activeTab: mode
    })

  },

  cancleRouteMode: function(){
    this.props.setMapMode('search');
    this.props.clearMap();
  },
  render: function(){
      return(
        <div>
        <SearchWhileRoute 
          startPoint = {this.props.startPoint}
          addMarker = {this.props.addMarker}
          destPoint = {this.props.destPoint}
          setStartPoint = {this.props.setStartPoint} />
          <div className="routeBtnGroup segmented-control">
               <a className={(this.state.activeTab === "auto")? "active control-item" : "control-item"} ref="autoBtn" id="autoRoute" onClick= {this.route.bind(this,"auto")}> auto </a>
               <a className={(this.state.activeTab === "bicycle")? "active control-item" : "control-item"} ref="bicycleBtn" id="bikeRoute" onClick= {this.route.bind(this,"bicycle")}> bike </a>
               <a className={(this.state.activeTab === "pedestrian")? "active control-item" : "control-item"} ref="pedestrianBtn" id="walkRoute" onClick= {this.route.bind(this,"pedestrian")} > walk</a>
          </div>
          <div className="sideBtn">
            <span className="icon icon-close" onClick= {this.cancleRouteMode}></span>
          </div>
        </div>
      )
  }
});

var RouteButton = React.createClass({
  getInitialState : function(){
    return{
      //startPoint must be replaced current location // search result
      destPoint : {},
      destPoint : this.props.destMarker,
      routePrirority : this.props.routePrirority,
      bringRouteWindow: false
    }
  },
  route : function(){
    this.props.setMapMode('route');
  },
  render : function(){
      return(
        <div>
          <div className="sideBtn" onClick = {this.route} >
           <span className="icon icon-check"></span>
          </div>
        </div>
      );

  }
});


var Main = React.createClass({

  getInitialState: function(){
    return{
      // markerLyaer is being mutated, not the way react recommends
      currentPoint : {
        name : "Current location",
        lat: 0,
        lon: 0
      },
      startPoint : {
        name : "Start location",
        lat :  40.7410605,
        lon : -73.9896986
      },
      currentLayer : L.layerGroup(),
      markerLayer : L.layerGroup([L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.')]),
      routeLayer : L.layerGroup(),
      mode : "search"
    }

  },
  setStartPoint: function(mrkr){
    this.setState({startPoint:mrkr});
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
    });
    var center = L.latLng(pos.coords.latitude,pos.coords.longitude);
    this.state.currentLayer.clearLayers();
    this.state.currentLayer.addLayer(L.circleMarker(center), 3, {
      color: '#00f',
      opacity:1,
      fillColor: '#00f',
      fillOpacity: 0.8,

    });
    this.map.setView(center,14);
    this.setState({
      bbox : this.map.getBounds().toBBoxString()
    });
  },

  addMarker: function(mrkr){

    this.state.markerLayer.clearLayers();
    var marker = L.marker([mrkr.lat,mrkr.lon]);
    this.state.markerLayer.addLayer(marker);
    
    this.map.setView(marker.getLatLng(),14);
    this.setState({
      destMarker: mrkr,
      bbox : this.map.getBounds().toBBoxString()
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
    var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // loading scene yaml
    //Error: Can't load worker because couldn't find base URL that library was loaded from
     // var layer = Tangram.leafletLayer({
     //     scene: 'scene.yaml',//sceneYaml,
     //     attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
     // });
    layer.addTo(map);
    return map;
    },

    setupMap: function () {
      this.map.setView([40.758, -73.9174], 10);
      this.setState({
        bbox : this.map.getBounds().toBBoxString()
      });
    },

    componentDidMount: function () {
        if (this.props.createMap) {
            this.map = this.props.createMap(this.getDOMNode());
        } else {
            this.map = this.createMap(this.getDOMNode());
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
         <div className = "searchBoxContainer">
            <SearchBox
            addMarker = {this.addMarker}
            bbox = {this.bbox}
            />
          </div>
          <RouteButton 
          destMarker= {this.state.destMarker} 
          addRouteLayer = {this.addRouteLayer}
          setMapMode = {this.setMapMode}
          mode = {this.state.mode}/>
          <CurrentLocation
            setCurrentLocation = {this.setCurrentPoint} />
          <RouteHandler />
          <div id="map"></div>
        </div>
      );
    }else{
        return(
          <div id="mapContainer">
          <RouteWindow 
            startPoint = {this.state.startPoint}
            destPoint = {this.state.destMarker}
            clearMap = {this.clearMap}
            addMarker = {this.addMarker}
            setStartPoint = {this.setStartPoint}
            addRouteLayer = {this.addRouteLayer}
            setMapMode = {this.setMapMode}/>
          <div id="map"></div>
        </div>
        );
      }
    }
});

module.exports = Main;
