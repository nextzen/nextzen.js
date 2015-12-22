import React from 'react';

require('./css/ratchet.css');
require('./css/main.scss');

import Map from './LeafletMap/Map';
import { merge } from 'lodash';

var Main = React.createClass({

  getInitialState: function() {
    return {
      moving: false
    }
  },
  componentWillMount: function() {
    //document.addEventListener('mou',this.getHash);
  },

  componentDidMount: function () {
    Map.init();
    const viewLatLng = this.props.location.query.viewLatLng
    const viewZ = this.props.location.query.viewZ
    if(viewLatLng && viewZ) Map.setView(viewLatLng, viewZ)
  },

  getHash: function(e) {
    const hash = Map.getHash()
    const viewHash = {
      viewLatLng: hash.latLng,
      viewZ: hash.zoom
    }
    const finalHash = merge({}, this.props.location.query, viewHash);

    this.props.replaceState(null, this.props.location.pathname , finalHash);
  },

  render: function () {
    return(
      <div className="container default">
        <div onMouseUp = {this.getHash} id = "map" /> 
          {this.props.children}
        </div>
      );
  }
});

module.exports = Main;
