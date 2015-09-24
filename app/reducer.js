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
        startPoint: action.startPoint
      };

    case 'updateDestPoint':
      return { 
        destPoint: action.destPoint
      };

    case 'updateCurrentPoint':
    console.log(action)
      return { 
        currentPoint: action.currentPoint
      };
  }
}

var store = createStore(updatePoint);

module.exports = store;