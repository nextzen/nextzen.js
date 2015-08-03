var React = require('react');
require('../css/main.scss');

var RouteButton = React.createClass({
  route : function(){
    this.props.setMapMode("route");
  },
  render : function(){
    return(
      <div className="sideBtn" onClick = {this.route}>
        <div className="route-icon"></div>
      </div>
    );
  }
});

module.exports = RouteButton;