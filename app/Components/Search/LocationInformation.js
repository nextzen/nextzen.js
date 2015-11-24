import React from 'react';
import ReactDOM from 'react-dom';
import RouteButton from '../Routing/RouteButton';
import {connect} from 'react-redux';

import store from '../../reducer';
import Actions from '../../actions';

var Keys = require('../Keys.js');

var $ = require('jquery');

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
      var self = this;
      
      $.ajax({
        type:"GET",
        crossDomain: true,
        url: callurl,
        success: function(data){
            var title = data.features[0].properties.label.split(',');
            var _mainTitle = title[0];
            var _neighborhood = title[1] + title[2];

            self.props.setDestinationPoint({
              name: _mainTitle,
              lat: data.features[0].geometry.coordinates[1],
              lon: data.features[0]. geometry.coordinates[0]
            });
          self.setState({
            mainTitle: _mainTitle,
            neighborhood: _neighborhood
          }, function() {
            document.getElementById('locationTitle').innerHTML = self.state.mainTitle;
            document.getElementById('locationNeighborhood').innerHTML = self.state.neighborhood;
          });
        },
        error: function(){
          console.log('can\'t find the place');
        }
      });
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

function mapDispatchToProps(dispatch) {
  return {
    setDestinationPoint: function(selectedLocation) {
      store.dispatch(Actions.selectPlace(selectedLocation));
      store.dispatch(Actions.updateDestPointAction(selectedLocation));
    }
  }
}

var ConnectedLocationInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationInformation);


module.exports = ConnectedLocationInformation;