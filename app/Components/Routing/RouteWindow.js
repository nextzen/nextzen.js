import React from 'react';
import ReactDOM from 'react-dom';
import polyline from 'polyline';
var $ = require('jquery');
var ReactSpinner = require('../Spin');
var RouteResultTable = require('./RouteResultTable');
var SearchWhileRoute = require('./SearchWhileRoute');

var Actions = require('../../actions');
var store = require('../../reducer');

import ErrorMessage from '../Util/ErrorMessage';

var Keys = require('../Keys');


var RouteWindow = React.createClass({

  getInitialState: function(){
    return{
      //spin js options
      activeTab: '',
      config : {
        lines: 9 // The number of lines to draw
        , length: 0 // The length of each line
        , width: 6 // The line thickness
        , radius: 8 // The radius of the inner circle
        , color: '#27AAE1' // #rgb or #rrggbb or array of colors
        , speed: 1 // Rounds per second
        , className: 'spinnerClass' // The CSS class to assign to the spinner
        , top: '55%' // Top position relative to parent
        , left: '55%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: true // Whether to use hardware acceleration
      },
      spinning: false
    }
  },

  componentDidMount: function() {
    //query check
    if((Object.keys(this.props.location.query).length !== 0)) {
      var startPoint = this.props.location.query.start;
      var destPoint = this.props.location.query.dest;

      this.props.setStartPoint(startPoint);
      this.props.setDestPoint(destPoint);

      this.route("auto", startPoint, destPoint);
      this.props.history.replaceState({},'/maps/direction',{start: startPoint, dest: destPoint});
    }
  },

  route: function(mode, _startPoint, _destPoint){
    //valhalla call form : https://valhalla.mapzen.com/route?json={%22locations%22:[{%22lat%22:39.42923221970601,%22lon%22:-76.6356897354126},{%22lat%22:39.30727282892593,%22lon%22:-76.77203178405762}],%22costing%22:%22auto%22}&api_key=valhalla-RfDii2g
    var serviceurl = "https://valhalla.mapzen.com/";
    var apikey = '&api_key=' + Keys.turnByTurn;

    var transitM = mode || 'auto';
    var locs = [];

    var startPoint = _startPoint;
    var destPoint = _destPoint;
    locs.push({
      lat : startPoint.lat,
      lon : startPoint.lon
    });

    locs.push({
      lat : destPoint.lat,
      lon : destPoint.lon
    });

    var self = this;

    var params = JSON.stringify({
      locations: locs,
      costing: transitM
    });

    var routeUrl = serviceurl +  'route?json=' + params + apikey;
    $('#routeCancelButton').toggleClass('routeCancelButton');
    this.mountSpinner();

    $.ajax({
      type:"GET",
      crossDomain: true,
      url: routeUrl,
      success: function(data){
        var coord = polyline.decode(data.trip.legs[0].shape,6);
        self.props.addRouteLayer(coord, startPoint, destPoint);
        self.mountTable(data);
        self.unmountSpinner();
      $('#routeCancelButton').toggleClass('routeCancelButton');
          },
          error: function(){
            var msg = "No route available between the points.";
            self.unmountSpinner();
            $('#routeCancelButton').toggleClass('routeCancelButton');
            ReactDOM.render(<ErrorMessage errorMessage = {msg}/>, document.getElementById('route-result-table'));
          }
      });


    this.props.history.pushState({},'/maps/direction',{start: this.props.startPoint, dest: this.props.destPoint});
    self.setState({
      activeTab: mode
    })
  },

  mountSpinner: function(){
    ReactDOM.render(<ReactSpinner config={this.state.config}/>, document.getElementById('routeCancelButton'));
    this.setState({
      spinning:true
    });
  },

  unmountSpinner: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('routeCancelButton'));
    this.setState({
      spinning:false
    })
  },

  mountTable: function(data){
    ReactDOM.render(<RouteResultTable searchData = {data}/>, document.getElementById('route-result-table'));
  },

  unmountTable: function(){
    React.unmountComponentAtNode(document.getElementById('route-result-table'));
  },

  cancleRouteMode: function(){
    store.dispatch(Actions.setMapModeAction('default'));
    store.dispatch(Actions.clearPointsAction());
    this.props.clearMap();
  },

  render: function(){

    return(
      <div>
        <SearchWhileRoute 
          startPoint = {this.props.startPoint}
          destPoint = {this.props.destPoint}
          linknode = {this.props.linknode}
          addMarker = {this.props.addMarker}
          setStartPoint = {this.props.setStartPoint}
          currentPoint = {this.props.currentPoint}
          unmountTable = {this.unmountTable}
          cancleRouteMode = {this.cancleRouteMode}/>
        <div className="routeBtnGroup segmented-control">
          <a className={(this.state.activeTab === "auto")? "active control-item" : "control-item"} ref="autoBtn" onClick= {this.route.bind(this,"auto", this.props.startPoint, this.props.destPoint)}>
            <div className = "routeModeButton" id="autoRoute" />
          </a>
          <a className={(this.state.activeTab === "bicycle")? "active control-item" : "control-item"} ref="bicycleBtn" onClick= {this.route.bind(this,"bicycle",this.props.startPoint, this.props.destPoint)}>
            <div className = "routeModeButton" id="bikeRoute" />
          </a>
          <a className={(this.state.activeTab === "pedestrian")? "active control-item" : "control-item"} ref="pedestrianBtn" onClick= {this.route.bind(this,"pedestrian",this.props.startPoint, this.props.destPoint)} > 
            <div className = "routeModeButton" id="walkRoute" />
          </a>
        </div>
        <div id="route-result-table"></div>
      </div>
      )
  }
});

module.exports = RouteWindow;