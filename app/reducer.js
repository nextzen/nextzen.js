var React = require('react');
var Main = require('./Components/Main');

var Redux = require('redux');
var ReactRedux = require('react-redux');

var createStore = Redux.createStore;
var Provider = ReactRedux.Provider;

function updatePoint(state, action) {
  if (typeof state === 'undefined') {
    state = {geocodes: []};
  }
  switch(action.type) {
    case 'updateStartPoint':
      return { 
        startPoint: action.startPoint,
        destPoint: state.destPoint,
        currentPoint: state.currentPoint
      };

    case 'updateDestPoint':
      return { 
        startPoint: state.startPoint,
        destPoint: action.destPoint,
        currentPoint: state.currentPoint
      };

    case 'updateCurrentPoint':
      return { 
        startPoint: state.startPoint,
        destPoint: state.destPoint,
        currentPoint: action.currentPoint
      };
  }
}

var store = createStore(updatePoint);

module.exports = store;