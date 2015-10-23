import React, { Component} from 'react';

import RouteWindow from './RouteWindow';

class RoutingWrapper extends Component {
  render () {
    return (
        <RouteWindow 
            startPoint = {this.props.startPoint}
            setStartPoint = {this.props.setStartPoint}
            currentPoint ={this.props.currentPoint}
            destPoint = {this.props.destPoint}
            clearMap = {this.props.clearMap}
            addMarker = {this.props.addMarker}
            addRouteLayer = {this.addRouteLayer}
            setMapMode = {this.setMapMode}/>
    )
  }
}

module.exports = RoutingWrapper;