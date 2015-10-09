var React = require('react');

var RouteButton = React.createClass({
  setMode : function(){
    this.props.setMapMode("route");
  },
  render : function(){
    return(
      <div className = "routeButton route-icon"
      onClick = {this.setMode} />
    );
  }
});

module.exports = RouteButton;