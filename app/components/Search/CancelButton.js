import React from 'react';
import Map from '../LeafletMap/Map'

import {clearPoints} from '../../actions/index';

import { Link } from 'react-router';

var CancelButton = React.createClass({
  clear : function(){
    this.props.clearPoints();
    Map.clear();
  },
  render : function(){
    return(
      <Link to = "/maps">
        <div id="cancelButton" className = {this.props.styles} onClick = {this.clear} />
      </Link>
    );
  }
});

module.exports = CancelButton;