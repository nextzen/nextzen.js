import React from 'react';

import Redux, { createStore, compose, combineReducers } from 'redux';
import {Provider} from'react-redux';
import cookie from 'react-cookie';

import { routerStateReducer } from 'redux-router';

import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import {createHistory} from 'history/lib/createBrowserHistory';


const initialState = {
  startPoint: {},
  destPoint: {},
  currentPoint: cookie.load('currentLocation'),
  selectedPoint: {},
  mapMode: 'default'
}

function updatePoint(state = initialState, action = {}) {
  
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
        selectedPoint: action.selectedPoint,
        destPoint: action.selectedPoint
      };

    case 'clearPoints':
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

module.exports = reducer;