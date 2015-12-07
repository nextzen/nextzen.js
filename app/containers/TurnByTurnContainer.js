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
      focustPoint: this.props.focusPoint,
      link: '/maps/direction',
      key: Keys.turnByTurn
    }

    return (
        <RouteWindow 
            config = {turnByTurnConfig}
            updateStartPoint = {this.props.updateStartPoint}
            updateDestPoint = {this.props.updateDestPoint}
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
    focusPoint: state.updatePoint.currentPoint || state.updatePoint.destPoint || state.updatePoint.startPoint,
  }
}

import { updateStartPoint, updateDestPoint } from '../actions/index';

export default connect(mapStateToProps,{
  updateStartPoint,
  updateDestPoint,
  pushState,
  replaceState
})(TurnByTurnContainer);