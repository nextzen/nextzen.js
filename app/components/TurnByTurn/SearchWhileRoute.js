import React,{propTypes} from 'react'
import SearchBox from './SearchBox'
import SwapPoints from './SwapPoints'
import CancelButton from '../Search/CancelButton'
import { Link } from 'react-router'
import ReactSpinner from '../Util/Spin'

import Keys from '../Keys';

var SearchWhileRoute = React.createClass({

  getInitialState: function() {
    return {
      config : {
        lines: 9 // The number of lines to draw
        , length: 0 // The length of each line
        , width: 6 // The line thickness
        , radius: 8 // The radius of the inner circle
        , color: '#27AAE1' // #rgb or #rrggbb or array of colors
        , speed: 1 // Rounds per second
        , className: 'spinnerClass' // The CSS class to assign to the spinner
        , top: '55%' // Top position relative to parent
        , left: '55%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: true // Whether to use hardware acceleration
      }
    }
  },

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

    if(!this.props.spinning) {
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
          styles = "routeCancelButton"
          clearPoints={this.clearPointsAndRoute}/>
      </div>
    )} else {
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
          <div id="cancelButton" className = "routeCancelButton loading">
            <ReactSpinner
              config = {this.state.config} />
          </div>
        </div>
      )
    }
  }
})

module.exports = SearchWhileRoute;