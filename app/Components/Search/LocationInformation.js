import React from 'react';
import ReactDOM from 'react-dom';
import RouteButton from '../Routing/RouteButton';
import {connect} from 'react-redux';

import store from '../../reducer';
import Actions from '../../actions';

var Keys = require('../Keys.js');

var $ = require('jquery');

var LocationInformation = React.createClass({
  render: function(){

    var mainTitle = "";
    var neighborhood = "";

    if((Object.keys(this.props.selectedPoint).length !== 0)) {
      var title = this.props.selectedPoint.name.split(',');
      mainTitle = title[0];
      neighborhood = title[1] + title [2];
    } else {
      var gid = this.props.location.query.gid;
      var callurl = 'https://search.mapzen.com/v1/place?api_key='
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
            mainTitle = title[0];
            neighborhood = title[1] + title[2];


            self.props.setDestinationPoint({
              name: mainTitle,
              lat: data.features[0].geometry.coordinates[0],
              lon: data.features[0]. geometry.coordinates[1]
            });
            document.getElementById('locationTitle').innerHTML = mainTitle;
            document.getElementById('locationNeighborhood').innerHTML = neighborhood;
          },
          error: function(){
            console.log('can\'t find the place');
          }
      });

    }
    return(
      <div className = "locationInformation">
        <div id = "locationTitle" className = "locationTitle"> {mainTitle} </div>
        <div id = "locationNeighborhood" className = "neighborhood"> {neighborhood} </div>
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