import React from 'react';

require('./css/ratchet.css');
require('./css/main.scss');

import Map from './LeafletMap/Map';

var Main = React.createClass({

    componentDidMount: function () {
      Map.init();
    },

    render: function () {
      return(
        <div className="container default">
          <div id = "map" /> 
            {this.props.children}
          </div>
        );
      
    }
});

module.exports = Main;
