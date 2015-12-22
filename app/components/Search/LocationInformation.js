import React from 'react'
import ReactDOM from 'react-dom'
import RouteButton from '../TurnByTurn/RouteButton'
import {connect} from 'react-redux'

import Map from '../LeafletMap/Map'
import Keys from '../Keys.js'


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
    if(this.props.location.query.hasOwnProperty('gid')) {

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
          var _lat = data.features[0].geometry.coordinates[1];
          var _lon = data.features[0].geometry.coordinates[0];
          
          var _mainTitle = title[0];
          var _neighborhood = title[1] + title[2];

          var _selectedPoint = {
             title: data.features[0].properties.label,
             lat: _lat,
             lon: _lon
           }

          this.props.selectPlace(_selectedPoint);

          this.setState({
            mainTitle: _mainTitle,
            neighborhood: _neighborhood
          });
          Map.addMarker(_selectedPoint);
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
        <div id = "locationTitle" 
        ref = "locationTitleRef"
        className = "locationTitle"> {this.state.mainTitle}  </div>
        <div id = "locationNeighborhood" 
        ref = "locationNeighborhoodRef"
        className = "neighborhood"> {this.state.neighborhood} </div>
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

import {selectPlace} from '../../actions/index'

var ConnectedLocationInformation = connect(mapStateToProps,{
  selectPlace
})(LocationInformation);

module.exports = ConnectedLocationInformation;