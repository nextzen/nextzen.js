import React, { Component} from 'react';

import CancelButton from './CancelButton';
import SearchBox from './SearchBox';

import { Provider, connect } from 'react-redux';
import store from '../../reducer';
import Actions from '../../actions';

import MapObject from '../Map/MapObject';
import LocationInformation from './LocationInformation';

class SearchWrapper extends Component {

  render () {
    return (
      <div className = "searchBoxContainer search">
        <CancelButton/>
        <SearchBox
          addMarker = {this.props.addMarker}
          pointAction = {Actions.updateDestPointAction}
          startPoint = {this.props.startPoint}
          destPoint = {this.props.destPoint}
          currentPoint = {this.props.currentPoint}
          linknode = {this.props.linknode}
          searchBoxId = "main-search"
          placeholder = "Search addres or place."
          childClassName = "searchBox"
          addPOIMarkers = {this.props.addPOIMarkers} />
          <LocationInformation 
            selectedPoint = {this.props.selectedPoint} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    routerState: state.router,
    startPoint: state.updatePoint.startPoint,
    destPoint: state.updatePoint.destPoint,
    currentPoint: state.updatePoint.currentPoint,
    selectedPoint: state.updatePoint.selectedPoint,
    linknode: 'search/place',
    mode: state.updatePoint.mode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMarker: function(selectedLocation) {
      MapObject.addMarker(selectedLocation);
      store.dispatch(Actions.selectPlace(selectedLocation));
    }
  }
}

var ConnectedSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchWrapper);

module.exports = ConnectedSearch;