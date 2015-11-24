var React = require('react');
import {IndexRoute, Route} from 'react-router';

import TestUnit from '../Components/TestComponent';
var Main = require('../Components/Main');

module.exports = (
  <Route path="/" component={TestUnit}>
    <Route path = "maps" component = {Main} />
  </Route>
);
