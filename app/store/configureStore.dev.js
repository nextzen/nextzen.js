import { createStore, applyMiddleware,compose } from 'redux'
import { reduxReactRouter } from 'redux-router'
import thunk from 'redux-thunk'
import routes from '../config/routes'
import reducer from '../reducers/index'
import createHistory from 'history/lib/createBrowserHistory'


import createLogger from 'redux-logger'

import DevTools from '../containers/DevTools';


const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory}),
  applyMiddleware(createLogger()),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(reducer, initialState)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers/index', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}