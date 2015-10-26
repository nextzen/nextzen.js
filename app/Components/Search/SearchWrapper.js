import React, { Component} from 'react';

import CancelButton from './CancelButton';
import SearchBox from './SearchBox';

var Actions = require('../../actions');

class SearchWrapper extends Component {

  render () {
    console.log('wrapper');
    console.log(this.props);
    return (
      <div className = "searchBoxContainer search">
        <CancelButton/>
        <SearchBox
          addMarker = {this.props.addMarker}
          pointAction = {Actions.updateDestPointAction}
          startPoint = {this.props.startPoint}
          destPoint = {this.props.destPoint}
          currentPoint = {this.props.currentPoint}
          searchBoxId = "main-search"
          placeholder = "Search addres or place."
          childClassName = "searchBox"
          addPOIMarkers = {this.props.addPOIMarkers} />
          <div id = "locationInfoContainer" />
      </div>
      
    )
  }
}

module.exports = SearchWrapper;