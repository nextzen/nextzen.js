var React = require('react');
var Main = require('../components/Main');
//var Home = require('../componenets/Home');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;


module.exports = (
  //always rendering
  <Route name="app" path="/" handler={Main}></Route>
    //swapped out
    //<DefaultRoute handler = {Home}>
);
