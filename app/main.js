//general problem : when vendors are managed in vendor folder, asset path throws err :( 
var React = require('react');
var L = require('leaflet');
var $ = require('jquery');

var polyline = require('polyline');
require('react-leaflet');
require('leafletCss');
require('./main.css');

//should replace to tangram later
//var sceneYaml = require("file!./scene.yaml");

var ResultRow = React.createClass({
  handleClick: function(){
    var markers = [];
    var marker = L.marker(this.props.loc.reverse());
    marker.bindPopup(this.props.name);
    markers.push(marker);
    this.props.addMarker(markers);
    this.props.setInputValue(this.props.name);
    this.props.deactivateSearching();
  },
  render: function(){
    var displayName = this.props.name;
    return(
      <tr>
        <td class="resultRow" onClick= {this.handleClick} > {displayName} </td>
      </tr>
    );
  }
});

var ResultTable = React.createClass({
  render: function(){
    var rows = [];
      if(this.props.searchData.length > 0 && this.props.searching ){
        var self = this;
        this.props.searchData.forEach(function(result){
          rows.push(<ResultRow name = {result.properties.name} 
                               loc= {result.geometry.coordinates} 
                               key= {result.properties.id} 
                               addMarker = {self.props.addMarker} 
                               searching = {self.props.searching}
                               setInputValue = {self.props.setInputValue}
                               deactivateSearching = {self.props.deactivateSearching}/>)
        });
    }

    return(
      <table id="searchTable">
        <tbody>{rows}</tbody>
      </table>
    );
  }
});



var SearchBox = React.createClass({

  getInitialState: function(){
    return{ 
      searchResult : [],
      searching : false
    };
  },

  handleChange: function(){
    var currentType = this.refs.filterTextInput.getDOMNode().value;
    this.makeCall(currentType);
    var searchResult = this.state.searchResult;
    this.props.onUserInput(currentType);
    this.setState({searching: true});
  },

  deactivateSearching:function(){
    this.setState({searching: false});
  },

  setInputValue: function(val){
    this.refs.filterTextInput.getDOMNode().value = val;
  },

  makeCall: function(currentInput){
    // pelias api form : https://pelias.mapzen.com/suggest?bbox=-74.18861389160156,40.62802447679272,-73.79173278808594,40.86134282702074&input=we+are&lat=40.7448&lon=-73.9902&size=10&zoom=12
    var self = this;
    if(currentInput.length > 0){
      var baseurl = '//pelias.mapzen.com';
      var bbox = '-74.18861389160156,40.62802447679272,-73.79173278808594,40.86134282702074';
      var input = currentInput;
      var lat = '40.744';
      var lon = '-73.990';
      var zoom = 12;
      var searchData;

      var callurl = baseurl + "/suggest?bbox=" + bbox + "&input="+ currentInput + "&lat="+lat+"&lon="+lon+"&zoom="+ zoom;
    $.get(callurl,function(data){
      //this is not the way react recommends
      self.setState({searchResult: data.features});
    });
  }else{
    self.setState({searchResult: []})
  }

  },

  render: function(){
    return(
      <div id="searchBar">
        <input id="searchBox" ref = "filterTextInput" type = "text" value = {this.props.filterText}  onChange={this.handleChange}></input>
        <ResultTable searchData = {this.state.searchResult}
                      searching = {this.state.searching} 
                      addMarker = {this.props.addMarker}
                      setInputValue = {this.setInputValue}
                      deactivateSearching = {this.deactivateSearching} />
      </div>
    );
  }
});


var RouteWindow = React.createClass({
  //
  route: function(){

    //valhalla call form : https://valhalla.mapzen.com/route?json={%22locations%22:[{%22lat%22:39.42923221970601,%22lon%22:-76.6356897354126},{%22lat%22:39.30727282892593,%22lon%22:-76.77203178405762}],%22costing%22:%22auto%22}&api_key=valhalla-RfDii2g
    var serviceurl = "https://valhalla.mapzen.com/";
    var apikey = '&api_key=valhalla-RfDii2g';

    var transitM = 'auto';
    var locs = [];
    locs.push(this.props.startPoint);
    locs.push(this.props.destPoint);

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

  },

  buildRouteUrl: function(){

  },
  routeDone: function(){

  },

  render: function(){

    if(this.props.bringRouteWindow){
      return(
         <div id="routeBtnGroup">
           <input type="button" id="autoRoute" value="auto" onClick= {this.route}></input>
           <input type="button" id="bikeRoute" value="bike" onClick= {this.route}></input>
           <input type="button" id="walkRoute" value="pedesterain" onClick= {this.route} ></input>
         </div>
      )
    }else{
      return(
        <div></div>
      )
    }
  }
});

var RouteButton = React.createClass({
  getInitialState : function(){
    return{
      //startPoint must be replaced current location // search result
      startPoint : {},
      destPoint : {},
      destPoint : this.props.destMarker,
      routePrirority : this.props.routePrirority,
      bringRouteWindow: false
    }
  },
  turnOffRoutingDetail:function(){
    //this.setState({bringRouteWindow:false});
  },
  route : function(){
    this.setState({
      bringRouteWindow : true,
      startPoint : {
        lat :  40.7410605,
        lon : -73.9896986
      },
      destPoint : {
       lat:this.props.destMarker.getLatLng().lat,
       lon:this.props.destMarker.getLatLng().lng,
      }
    });
  },

  render : function(){
    if(this.props.destMarker){
      return(
        <div>
          <div id="routeBtn" onClick = {this.route} > route </div>
          <RouteWindow 
            bringRouteWindow = {this.state.bringRouteWindow} 
            startPoint = {this.state.startPoint}
            destPoint = {this.state.destPoint}
            addMarker = {this.props.addMarker}
            addRouteLayer = {this.props.addRouteLayer}/>
        </div>
      );
    }else{
      return(
        <div></div>
      );
    }
  }
});


var Map = React.createClass({

  getInitialState: function(){
    return{
      // markerLyaer is being mutated, not the way react recommends
      markerLayer : L.layerGroup([L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.')]),
      routeLayer : L.layerGroup()
    }

  },

  handleUserInput: function(filterText) {
    this.setState({
      filterText: filterText
    });
  },

  addMarker: function(mrkrs){
    
    this.state.markerLayer.clearLayers();
    var newMarkerLayer = L.layerGroup();
    var self = this;
    //this.state.markerLayer.clearLayers()
    var centerMarker = mrkrs[0];
    mrkrs.forEach(function(marker){
      self.state.markerLayer.addLayer(marker);
    });

    //this.state.destMarker = centerMarker;
    this.map.setView(centerMarker.getLatLng(),14);
     this.setState({
       destMarker: centerMarker
     });
  },
  
  addRouteLayer : function(routes){
    this.state.routeLayer.clearLayers();
    var polylineRoute = L.polyline(routes, {color:'red'});
    this.state.routeLayer.addLayer(polylineRoute);
    this.map.fitBounds(polylineRoute.getBounds());
    this.render();
  },

  createMap: function (element) {
    var map = L.map(element,{
      zoomControl:false
    });
    var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // loading scene yaml
    // var layer = Tangram.leafletLayer({
    //     scene: 'scene.yaml',//sceneYaml,
    //     attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
    // });

    layer.addTo(map);
    //L.marker([40.729614,-73.993837]).addTo(map);
    return map;
    },

    setupMap: function () {
      this.map.setView([this.props.lat, this.props.lon], this.props.zoom);
    },

    componentDidMount: function () {
        if (this.props.createMap) {
            this.map = this.props.createMap(this.getDOMNode());
        } else {
            this.map = this.createMap(this.getDOMNode());
        }

        this.setupMap();
        this.state.markerLayer.addTo(this.map);
        this.state.routeLayer.addTo(this.map);
    },

    render: function () {
      return (
        <div id="mapContainer">
          <SearchBox onUserInput={this.handleUserInput} 
          destMarker= {this.state.destMarker} 
          addMarker = {this.addMarker} />
          <RouteButton destMarker= {this.state.destMarker} addRouteLayer = {this.addRouteLayer}/>
          <div id="map"></div>
        </div>
      );
    }

});

React.render(<Map lat="40.758" lon="-73.9174" zoom="4" />,document.body);
