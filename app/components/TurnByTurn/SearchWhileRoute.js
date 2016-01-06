import React,{propTypes} from 'react';
import SearchBox from './SearchBox';
import SwapPoints from './SwapPoints';
import CancelButton from '../Search/CancelButton'
import { Link } from 'react-router';

import Keys from '../Keys';

var SearchWhileRoute = React.createClass({

  clearPointsAndRoute: function() {
    this.props.clearPoints();
    this.props.clearRouteData();
  },

  render: function(){

      const { startPoint, destPoint, link } = this.props.config;
      const{ routeData, clearRouteData, updateStartPoint, updateDestPoint, location } = this.props;

      const startSearchBoxConfig = {
        placeholder: 'Choose start point',
        name: 'start',
        pointAction: updateStartPoint,
        childClass: 'searchBox startPoint',
        focusPoint: destPoint || startPoint || {},
        key: Keys.search
      }

      const destSearchBoxConfig = {
        placeholder: 'Choose destination point',
        name: 'destination',
        pointAction: updateDestPoint,
        childClass: 'searchBox destPoint',
        focusPoint: startPoint || destPoint || {},
        key: Keys.search
      }
    return (
    <div className = "searchBoxContainer route">
      <SwapPoints 
        startPoint = {startPoint}
        destPoint = {destPoint}
        updateStartPoint = {updateStartPoint}
        updateDestPoint = {updateDestPoint} />
      <SearchBox 
        config = {startSearchBoxConfig}
        clearRouteData = {clearRouteData}
        routeData = {routeData}
        label = {startPoint.name}
        location = {location}/>
      <SearchBox 
          config = {destSearchBoxConfig}
          clearRouteData = {clearRouteData}
          routeData = {routeData}
          label = {destPoint.name}
          location = {location}/>
      <CancelButton
        styles={(this.props.spinning)? '':'routeCancelButton'}
        clearPoints={this.clearPointsAndRoute}/>
    </div>
    );
  }
})

module.exports = SearchWhileRoute;