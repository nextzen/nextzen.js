import React from 'react';
import ReactDOM from 'react-dom';
import RouteButton from '../Routing/RouteButton';

var LocationInformation = React.createClass({

  render: function(){
    //var info = this.props.markedLocation.name.split(',');
    if((Object.keys(this.props.selectedPoint).length !== 0)) {
    var title = this.props.selectedPoint.name.split(',');
    var mainTitle = title[0];
    var neighborhood = title[1] + title [2];
    }
    //var neighborhood = info[1] + info[2];
    // routing makes problem with injected componenet, doing css trick here
    console.log(this.props);
    return(
      <div className = {((Object.keys(this.props.selectedPoint).length !== 0) )? "locationInformation" : "locationInformation hidden"}>
        <div className = "locationTitle"> {mainTitle} </div>
        <div className = "neighborhood"> {neighborhood} </div>
        <RouteButton />
      </div>
    );
  }
});

module.exports = LocationInformation;