var React = require('react');

var Actions = require('../../actions');
var store = require('../../reducer');

var RouteButton = React.createClass({
  setMode : function(){
    store.dispatch(Actions.setMapModeAction('route'));
  },
  render : function(){
    return(
      <div className = "routeButton route-icon"
      onClick = {this.setMode} />
    );
  }
});

module.exports = RouteButton;