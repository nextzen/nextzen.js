import React, { Component} from 'react';
import { Provider, connect} from 'react-redux';

var TestUnit = React.createClass({

  render: function () {
    console.log('being rendered');
    return(
       <div className="container default">
         <a href = "/another"> lets go to maps </a>
       </div>
     );
    }
});

function mapStateToProps(state) {
  return {
    routerState: state.router
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

var ConnectedTest = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestUnit);


module.exports = ConnectedTest;
