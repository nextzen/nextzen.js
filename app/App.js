import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import {
  ReduxRouter,
  reduxReactRouterre
} from 'redux-router';

import { Provider } from 'react-redux';
import {IndexRoute, Route, Link, Redirect} from 'react-router';
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
            <Redirect from="/" to="/maps"/>
            <Route path="/maps" component={Main}>
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