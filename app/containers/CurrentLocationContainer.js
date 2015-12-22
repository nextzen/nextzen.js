import React, { Component } from 'react'

import { connect } from 'react-redux'

import CurrentLocation from '../components/CurrentLocation/CurrentLocation'


class CurrentLocationWrapper extends Component {
  render () {

    return (
      <CurrentLocation 
        updateCurrentPoint= {this.props.updateCurrentPoint}/> )
  }
}

function mapStateToProps(state) {
  return {
    routerState: state.router
  }
}

import { updateCurrentPoint, updateStartPoint } from '../actions/index'
import { pushState } from 'redux-router'

export default connect( mapStateToProps,{
  updateCurrentPoint,
  updateStartPoint,
  pushState
})(CurrentLocation);