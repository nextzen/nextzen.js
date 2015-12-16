var React = require('react');

import { Link } from 'react-router';

var RouteButton = React.createClass({
  render : function(){
    return(
      <Link to = "/maps/direction">
        <div className = "routeButton route-icon" />
      </Link>
    );
  }
});

module.exports = RouteButton;