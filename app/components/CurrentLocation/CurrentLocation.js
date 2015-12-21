import React from 'react';
import ReactDOM from 'react-dom';
import ReactSpinner from '../Util/Spin'
import cookie from 'react-cookie';

import Map from '../LeafletMap/Map';
import ErrorMessage from '../Util/ErrorMessage';

var CurrentLocation = React.createClass({
  getInitialState: function(){
    return{
      //spin js options
      config : {
        lines: 9 // The number of lines to draw
        , length: 0 // The length of each line
        , width: 6 // The line thickness
        , radius: 8 // The radius of the inner circle
        , color: '#27AAE1' // #rgb or #rrggbb or array of colors
        , speed: 1 // Rounds per second
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '55%' // Top position relative to parent
        , left: '55%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: true // Whether to use hardware acceleration
      },
      spinning: false
    }
  },

  getCurrentLocation: function(){
    this.mountSpinner();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var currentLocation = {
            name : "Current Location",
            lat: position.coords.latitude,
            lon: position.coords.longitude
        }
        cookie.save('currentLocation', currentLocation);
        this.props.updateCurrentPoint(currentLocation);
        this.props.updateStartPoint(currentLocation);
        Map.setCurrentPoint(currentLocation);
        this.unmountSpinner();
      });
    } else {
        //what will it show when browser doesn't support geolocation?
    }
  },
  mountSpinner: function(){
    this.setState({
      spinning:true
    });
  },
  unmountSpinner: function(){
    this.setState({
      spinning:false
    })
  },
  render : function(){
    let spinner;
    if(this.state.spinning) spinner = (<div id="spinnerSpot"> <ReactSpinner config={this.state.config}/></div>);
    return(
      <div className="currentLocation side">
        <div className={(this.state.spinning === false)? "icon-current-location" : "icon-hexagon"} onClick= {this.getCurrentLocation}></div>
        {spinner}
      </div>
    );
  }
});

module.exports = CurrentLocation;

