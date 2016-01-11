import React, { Component} from 'react';

import { Provider, connect } from 'react-redux';
import { replaceState, pushState } from 'redux-router'

import RouteWindow from '../components/TurnByTurn/RouteWindow';

import Keys from '../components/Keys'

class TurnByTurnContainer extends Component {

  render () {
    const turnByTurnConfig = {
      startPoint: this.props.startPoint,
      destPoint: this.props.destPoint,
      link: '/maps/direction',
      key: Keys.turnByTurn
    }

    return (
        <RouteWindow 
            config = {turnByTurnConfig}
            updateStartPoint = {this.props.updateStartPoint}
            updateDestPoint = {this.props.updateDestPoint}
            clearPoints = {this.props.clearPoints}
            routeData = {this.props.routeData}
            updateRouteData = {this.props.updateRouteData}
            clearRouteData = {this.props.clearRouteData}
            location = {this.props.location}
            pushState = {this.props.pushState}
            replaceState = {this.props.replaceState} />
    )
  }
}

function mapStateToProps(state) {
  return {
    routerState: state.router,
    startPoint: state.updatePoint.startPoint,
    destPoint: state.updatePoint.destPoint,
    routeData: state.updateResponse.routeData
  }
}

import { updateStartPoint, updateDestPoint, clearPoints, updateRouteData, clearRouteData } from '../actions/index';

export default connect(mapStateToProps, {
  updateStartPoint,
  updateDestPoint,
  clearPoints,
  updateRouteData,
  clearRouteData,
  pushState,
  replaceState
})(TurnByTurnContainer);