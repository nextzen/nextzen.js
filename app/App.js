import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {
  ReduxRouter,
  reduxReactRouter
} from 'redux-router';

import { Provider } from 'react-redux';
import {IndexRoute, Route, Link} from 'react-router';
import Main from './Components/Main'

import store from './reducer';
import Home from './Components/Home';
import SearchWrapper from './Components/Search/SearchWrapper';
import RoutingWrapper from './Components/Routing/RoutingWrapper';
import LocationInformation from './Components/Search/LocationInformation';


class Root extends Component {
  render() {
    return (
      <div className = "temp">
        <Provider store={store}>
          <ReduxRouter>
            <Route path="/" component={Main}>
              <IndexRoute component = {Home} />
              <Route path="search" component = {SearchWrapper}>
                <Route path="place" component = {LocationInformation} />
              </Route>
              <Route path="direction" component = {RoutingWrapper} />
            </Route>
          </ReduxRouter>
        </Provider>
      </div>
    );
  }
}


ReactDOM.render(<Root />, document.getElementById('root'));