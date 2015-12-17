import { createStore, applyMiddleware,compose } from 'redux'
import { reduxReactRouter } from 'redux-router'
import routes from '../config/routes'
import thunk from 'redux-thunk'
import reducer from '../reducers/index'
import createHistory from 'history/lib/createBrowserHistory'
import createLogger from 'redux-logger'

const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({routes, createHistory})
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(reducer, initialState)
}