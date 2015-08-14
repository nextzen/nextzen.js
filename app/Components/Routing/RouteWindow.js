var React = require('react');
var polyline = require('polyline');
var $ = require('jquery');

var RouteResultTable = require('./RouteResultTable');
var SearchWhileRoute = require('./SearchWhileRoute');
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
      self.mountTable(data);
    });
    //there must be better way to do this
    self.setState({
      activeTab: mode
    })

  },
  mountTable: function(data){
    React.render(<RouteResultTable searchData = {data}/>, document.getElementById('route-result-table'));
  },
  unmountTable: function(){
    React.unmountComponentAtNode(document.getElementById('route-result-table'));
  },

  cancleRouteMode: function(){
    this.props.setMapMode('default');
    this.props.clearMap();
  },
  render: function(){
    return(
      <div>
        <SearchWhileRoute 
          startPoint = {this.props.startPoint}
          destPoint = {this.props.destPoint}
          addMarker = {this.props.addMarker}
          setStartPoint = {this.props.setStartPoint}
          currentPoint ={this.props.currentPoint} 
          cancleRouteMode = {this.cancleRouteMode}/>
        <div className="routeBtnGroup segmented-control">
          <a className={(this.state.activeTab === "auto")? "active control-item" : "control-item"} ref="autoBtn" onClick= {this.route.bind(this,"auto")}>
            <div className = "routeModeButton" id="autoRoute" />
          </a>
          <a className={(this.state.activeTab === "bicycle")? "active control-item" : "control-item"} ref="bicycleBtn" onClick= {this.route.bind(this,"bicycle")}>
            <div className = "routeModeButton" id="bikeRoute" />
          </a>
          <a className={(this.state.activeTab === "pedestrian")? "active control-item" : "control-item"} ref="pedestrianBtn" onClick= {this.route.bind(this,"pedestrian")} > 
            <div className = "routeModeButton" id="walkRoute" />
          </a>
        </div>
        <div id="route-result-table"></div>
      </div>
      )
  }
});

module.exports = RouteWindow;