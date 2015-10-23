import React, { Component} from 'react';

import CancelButton from './CancelButton';
import SearchBox from './SearchBox';

var Actions = require('../../actions');

class SearchWrapper extends Component {

  render () {
    return (
      <div className = "searchBoxContainer search">
        <CancelButton/>
        <SearchBox
          addMarker = {this.props.addMarker}
          pointAction = {Actions.updateDestPointAction}
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