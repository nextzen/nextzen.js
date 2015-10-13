var React = require('react');
var RouteButton = require('../Routing/RouteButton')

var LocationInformation = React.createClass({

  render: function(){
    var info = this.props.markedLocation.name.split(',');
    var title = info[0];
    var neighborhood = info[1] + info[2];
    return(
      <div className = "locationInformation">
        <div className = "locationTitle">{title}</div>
        <div className = "neighborhood">{neighborhood}</div>
        <RouteButton />
      </div>
    );
  }
});

module.exports = LocationInformation;