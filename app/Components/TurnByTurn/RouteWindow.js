import React from 'react';
import ReactDOM from 'react-dom';
import polyline from 'polyline';
import $ from 'jquery';


import RouteResultTable from './RouteResultTable';
import SearchWhileRoute from './SearchWhileRoute';

import ErrorMessage from '../Util/ErrorMessage';
import ReactSpinner from '../Util/Spin';

import Map from '../LeafletMap/Map';

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
      const startPoint = this.props.location.query.start;
      const destPoint = this.props.location.query.dest;

      this.props.updateStartPoint(startPoint);
      this.props.updateDestPoint(destPoint);

      this.route("auto", startPoint, destPoint);
      this.props.replaceState({}, this.props.config.link ,{start: startPoint, dest: destPoint});
    }
  },

  route: function(mode, _startPoint, _destPoint) {
 
    const { link, key } = this.props.config;

    const startP = _startPoint;
    const destP = _destPoint;
 
    const serviceurl = "https://valhalla.mapzen.com/";
    const apikey = '&api_key=' + key;

    var self = this;

    const params = JSON.stringify({
      locations: [{
        lat : startP.lat,
        lon : startP.lon
      },{
        lat : destP.lat,
        lon : destP.lon
      }],
      costing: mode
    });

    const routeUrl = serviceurl +  'route?json=' + params + apikey;

    $('#routeCancelButton').toggleClass('routeCancelButton');
    this.mountSpinner();

    $.ajax({
      type:"GET",
      crossDomain: true,
      url: routeUrl,
      success: function(data){
        var coord = polyline.decode(data.trip.legs[0].shape,6);
        Map.addRouteLayer(coord, startP, destP);
        self.mountTable(data);
        self.unmountSpinner();
        $('#routeCancelButton').toggleClass('routeCancelButton');
      },
      error: function(){
        const msg = "No route available between the points.";
        self.unmountSpinner();
        self.unmountTable();
        $('#routeCancelButton').toggleClass('routeCancelButton');
        ReactDOM.render(<ErrorMessage errorMessage = {msg}/>, document.getElementById('route-result-table'));
      }
    });

    const { pushState } = this.props;

    pushState({},link,{start: startP, dest: destP});

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
    ReactDOM.unmountComponentAtNode(document.getElementById('route-result-table'));
  },

  render: function(){

    const config = this.props.config;
    const { updateStartPoint, updateDestPoint, location } = this.props;
    return(
      <div>
        <SearchWhileRoute 
          config = {config}
          updateStartPoint = { updateStartPoint}
          updateDestPoint = { updateDestPoint}
          location = {location} />
        <div className="routeBtnGroup segmented-control">
          <a className={(this.state.activeTab === "auto")? "active control-item" : "control-item"} ref="autoBtn" onClick= {this.route.bind(this,"auto", config.startPoint, config.destPoint)}>
            <div className = "routeModeButton" id="autoRoute" />
          </a>
          <a className={(this.state.activeTab === "bicycle")? "active control-item" : "control-item"} ref="bicycleBtn" onClick= {this.route.bind(this,"bicycle", config.startPoint, config.destPoint)}>
            <div className = "routeModeButton" id="bikeRoute" />
          </a>
          <a className={(this.state.activeTab === "pedestrian")? "active control-item" : "control-item"} ref="pedestrianBtn" onClick= {this.route.bind(this,"pedestrian", config.startPoint, config.destPoint)} > 
            <div className = "routeModeButton" id="walkRoute" />
          </a>
        </div>
        <div id="route-result-table"></div>
      </div>
      )
  }
});

module.exports = RouteWindow;