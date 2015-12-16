import React from 'react';
import ReactDOM from 'react-dom';
import RouteButton from '../TurnByTurn/RouteButton';
import {connect} from 'react-redux';
var Keys = require('../Keys.js');

var LocationInformation = React.createClass({
  
  getInitialState: function(){
    var _mainTitle = "";
    var _neighborhood = "";
    if((Object.keys(this.props.selectedPoint).length !== 0)) {
      var title = this.props.selectedPoint.name.split(',');
      _mainTitle = title[0];
      _neighborhood = title[1] + title [2];
    }
    return {
      mainTitle: _mainTitle,
      neighborhood: _neighborhood
    }
  },

  componentDidMount: function() {
    if((Object.keys(this.props.location.query).length !== 0)) {

      var gid = this.props.location.query.gid;
      var callurl = 'https://search.mapzen.com/v1/place?api_key=';
      var apikey = Keys.search;
      callurl += apikey;
      callurl +='&ids=';
      callurl += gid; 

      var request = new XMLHttpRequest();
      request.open('GET', callurl, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var data = JSON.parse(request.responseText);
          var title = data.features[0].properties.label.split(',');
          var _mainTitle = title[0];
          var _neighborhood = title[1] + title[2];

          this.setState({
            mainTitle: _mainTitle,
            neighborhood: _neighborhood
          }, function() {
            document.getElementById('locationTitle').innerHTML = _mainTitle;
            document.getElementById('locationNeighborhood').innerHTML = _neighborhood;
          });
        } else {
          console.log('can\'t find the place');
        }
      };

      request.onerror = function() {
        // when there is no search result / error? 
      };
    request.send();
    }
  },

  render: function(){
    return(
      <div className = "locationInformation">
        <div id = "locationTitle" className = "locationTitle"> {this.state.mainTitle} </div>
        <div id = "locationNeighborhood" className = "neighborhood"> {this.state.neighborhood} </div>
        <RouteButton />
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    selectedPoint: state.updatePoint.selectedPoint,
    routerState: state.router
  }
}

var ConnectedLocationInformation = connect(mapStateToProps)(LocationInformation);


module.exports = ConnectedLocationInformation;