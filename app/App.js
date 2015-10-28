import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, combineReducers } from 'redux';

import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter
} from 'redux-router';

import { Provider, connect } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import createHistory from 'history/lib/createBrowserHistory';
import {IndexRoute, Route, Link} from 'react-router';
import Main from './Components/Main'

import store from './reducer';
import Actions from './actions';
import Home from './Components/Home';
import SearchWrapper from './Components/Search/SearchWrapper';
import RoutingWrapper from './Components/Routing/RoutingWrapper';

import Map from './Components/Map/Map';
import MapObject from './Components/Map/MapObject';

function mapStateToProps(state) {

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

var ConnectedMain = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);


class Root extends Component {
  render() {
    return (
      <div className = "temp">
        <Provider store={store}>
          <ReduxRouter>
            <Route path="/" component={ConnectedMain}>
              <IndexRoute component = {Home} />
              <Route path="search" component = {SearchWrapper} />
              <Route path="search/place" component = {SearchWrapper} />
              <Route path="direction" component = {RoutingWrapper} />
            </Route>
          </ReduxRouter>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));