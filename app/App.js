var React = require('react');
var Main = require('./Components/Main');

var Redux = require('redux');
var ReactRedux = require('react-redux');

var createStore = Redux.createStore;
var Provider = ReactRedux.Provider;
var connect = ReactRedux.connect;

var store = require('./reducer.js');


// Map Redux state to component props

function mapStateToProps(state)  {
    if (typeof state === 'undefined') {
    state = {
      startPoint: {},
      destPoint: {},
      currentPoint: {},
      mode: ""
    };
  }
  return {
    startPoint: state.startPoint,
    destPoint: state.destPoint,
    currentPoint: state.currentPoint,
    mode: state.mode
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
  };
}


// Connected Component:
var App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);


React.render(
  React.createElement(Provider, {store: store}, 
    function(){
      return (<App/>)
    }
  ),
  document.body
);
