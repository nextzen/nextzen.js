var React = require('react');
var Main = require('./Components/Main');

var Redux = require('redux');
var ReactRedux = require('react-redux');


var Provider = ReactRedux.Provider;
import { createStore, compose, combineReducers } from 'redux';

import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter
} from 'redux-router';

import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import createHistory from 'history/lib/createBrowserHistory';


const initialState = {
  startPoint: {},
  destPoint: {},
  isThisInitialState : "yes",
  mapMode: 'default'
}
function updatePoint(state = initialState, action) {
  // if (typeof state === 'undefined') {
  //   state = {
  //     startPoint: {},
  //     destPoint: {},
  //     isThisInitialState : "yes",
  //     mapMode: 'default'
  //   };
  // }
  switch(action.type) {
    case 'updateStartPoint':
      return { 
        startPoint: action.startPoint,
        destPoint: state.destPoint,
        currentPoint: state.currentPoint,
        mapMode: state.mapMode
      };

    case 'updateDestPoint':
      return { 
        startPoint: state.startPoint,
        destPoint: action.destPoint,
        currentPoint: state.currentPoint,
        mapMode: state.mapMode
      };

    case 'updateCurrentPoint':
      return { 
        startPoint: state.startPoint,
        destPoint: state.destPoint,
        currentPoint: action.currentPoint,
        mapMode: state.mapMode
      };

    case 'setMapMode':
      return {
        startPoint: state.startPoint,
        destPoint: state.destPoint,
        currentPoint: state.destPoint,
        mapMode: action.mapMode
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  updatePoint,
  router: routerStateReducer
})

var store = compose(
  reduxReactRouter({createHistory}),
  devTools()
)(createStore)(reducer);

//var store = createStore(updatePoint);

module.exports = store;