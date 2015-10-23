import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, combineReducers } from 'redux';

import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter
} from 'redux-router';

import { Provider, connect } from 'react-redux';
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import createHistory from 'history/lib/createBrowserHistory';
import {IndexRoute, Route, Link} from 'react-router';
import Main from './Components/Main'

import store from './reducer';
import Home from './Components/Home';
import SearchWrapper from './Components/Search/SearchWrapper';
import RoutingWrapper from './Components/Routing/RoutingWrapper';

connect(state => ({ routerState: state.router }));


class App extends Component {


  render() {
    const links = [
      '/',
      '/maps'
    ].map(l =>
      <p>
        <Link to={l}>{l}</Link>
      </p>
    );

    return (
      <div>
        <h1>App Container</h1>
        {links}
        {this.props.children}
      </div>
    );
  }
}

class Root extends Component {
  render() {
    return (
      <div className = "temp">
        <Provider store={store}>
          <ReduxRouter>
            <Route path="/" component={Main}>
              <IndexRoute component = {Home} />
              <Route path="search" component = {SearchWrapper} />
              <Route path="direction" component = {RoutingWrapper} />
            </Route>
          </ReduxRouter>
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));