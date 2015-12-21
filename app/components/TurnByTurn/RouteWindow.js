import React from 'react';
import ReactDOM from 'react-dom';
import polyline from 'polyline';

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

    const callurl = serviceurl +  'route?json=' + params + apikey;

    this.mountSpinner();
    var request = new XMLHttpRequest();
    request.open('GET', callurl, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        var coord = polyline.decode(data.trip.legs[0].shape,6);
        Map.addRouteLayer(coord, startP, destP);
        this.mountTable(data);
        this.unmountSpinner();
      } else {
        // when there is no search result? 
        const msg = "No route available between the points.";
        this.unmountSpinner();
        this.unmountTable();
        ReactDOM.render(<ErrorMessage errorMessage = {msg}/>, document.getElementById('route-result-table'));
      }
    };

    request.onerror = function() {
      // when there is no search result / error? 
        const msg = "No route available between the points.";
        this.unmountSpinner();
        this.unmountTable();
        ReactDOM.render(<ErrorMessage errorMessage = {msg}/>, document.getElementById('route-result-table'));
    };

    request.send();

    const { pushState } = this.props;

    pushState({},link,{start: startP, dest: destP});

    self.setState({
      activeTab: mode
    })
  },

  mountSpinner: function(){
    ReactDOM.render(<ReactSpinner config={this.state.config}/>, document.getElementById('cancelButton'));
    this.setState({
      spinning:true
    });
  },

  unmountSpinner: function(){
    ReactDOM.unmountComponentAtNode(document.getElementById('cancelButton'));
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
    const { updateStartPoint, updateDestPoint, clearPoints, location } = this.props;
    return(
      <div>
        <SearchWhileRoute 
          config = {config}
          updateStartPoint = { updateStartPoint}
          updateDestPoint = { updateDestPoint}
          clearPoints = {clearPoints}
          spinning = {this.state.spinning}
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