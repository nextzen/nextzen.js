var React = require('react');

var Actions = require('../../actions');
var store = require('../../reducer');

import { Link } from 'react-router';

var RouteButton = React.createClass({
  setMode : function(){
    store.dispatch(Actions.setMapModeAction('route'));
  },
  render : function(){
    return(
      <Link to = "/maps/direction">
        <div className = "routeButton route-icon" onClick = {this.setMode} />
      </Link>
    );
  }
});

module.exports = RouteButton;