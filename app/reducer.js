var React = require('react');
var Main = require('./Components/Main');

var Redux = require('redux');
var ReactRedux = require('react-redux');
var cookie = require('react-cookie');

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
  currentPoint: cookie.load('currentLocation'),
  isThisInitialState : "yes",
  selectedPoint: {},
  mapMode: 'default'
}
function updatePoint(state = initialState, action = {}) {
  // if (typeof state === 'undefined') {
  //   state = initialState;
  // }
  // console.log('state');
  // console.log(state);
  
  
  switch(action.type) {
    case 'updateStartPoint':
      return {
        ...state,
        startPoint: action.startPoint
      };

    case 'updateDestPoint':
      return { 
        ...state,
        destPoint: action.destPoint
      };

    case 'updateCurrentPoint':
      return {
        ...state,
        currentPoint: action.currentPoint,
      };

    case 'setMapMode':
      return {
        ...state,
        mapMode: action.mapMode
      };
    case 'selectPlace':
      return {
        ...state,
        selectedPoint: action.selectedPoint
      };

    case 'clearPoints':
      console.log('clearing');
      return {
        ...state,
        startPoint: {},
        destPoint: {},
        selectedPoint: {}
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