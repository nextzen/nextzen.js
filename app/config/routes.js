import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'

import Main from '../Components/Main'
import Home from '../Components/Home';
import SearchWrapper from '../containers/SearchBoxcontainer';
import RoutingWrapper from '../containers/TurnByTurnContainer';
import LocationInformation from '../Components/Search/LocationInformation';

export default (
  <Route path="/maps" component={Main}>\
  <Redirect from="/" to="/maps"/>
    <IndexRoute component = {Home} />
    <Route path="search" component = {SearchWrapper}>
      <Route path="place" component = {LocationInformation} />
    </Route>
    <Route path="direction" component = {RoutingWrapper} />
  </Route>
)