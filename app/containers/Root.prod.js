import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {ReduxRouter} from 'redux-router'



export default class Root extends Component {
  render() {
    const { store } = this.props

    return (
      <div className = "temp">
        <Provider store={store}>
          <ReduxRouter/>
        </Provider>
      </div>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}