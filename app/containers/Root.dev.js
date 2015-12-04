import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import {ReduxRouter} from 'redux-router'
import DevTools from './DevTools'


export default class Root extends Component {
  render() {
    const { store } = this.props
    return (
      <div className = "full">
        <Provider store={store}>
          <div className = "full">
            <ReduxRouter/>
            <DevTools />
          </div>
        </Provider>
      </div>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}