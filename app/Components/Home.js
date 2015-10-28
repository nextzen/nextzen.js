import React, { Component} from 'react';
import { Link } from 'react-router';

import SearchButton from './Search/SearchButton';
import RouteButton from './Routing/RouteButton';
import CurrentLocation from './CurrentLocation/CurrentLocation';

import { Provider, connect } from 'react-redux';
import store from '../reducer';
import Actions from '../actions';

import MapObject from './Map/MapObject';

class Home extends Component {
  render() {
    return (
      <div>
        <div className = "searchBoxContainer">
          <Link to = '/search'> <SearchButton/> </Link>
           <RouteButton />
        </div>
        <CurrentLocation
          setCurrentLocation = {this.props.setCurrentLocation} />
      </div>
    )
  }
}

function mapStateToProps(state) {
    if (typeof state === 'undefined') {
    state = {
      startPoint: {},
      destPoint: {},
      currentPoint: {},
      mode: ""
    };
  }
  return {
    routerState: state.router,
    startPoint: state.updatePoint.startPoint,
    destPoint: state.updatePoint.destPoint,
    currentPoint: state.updatePoint.currentPoint,
    mode: state.updatePoint.mode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentLocation: function(currentLocation) {
      MapObject.setCurrentPoint(currentLocation);
      store.dispatch(Actions.updateCurrentPointAction(currentLocation));
      store.dispatch(Actions.updateStartPointAction(currentLocation));
    }
  }
}

var ConnectedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

module.exports = ConnectedHome;