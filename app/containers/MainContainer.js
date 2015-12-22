import React, { Component } from 'react'
import { connect } from 'react-redux'

import Main from '../components/Main'


function mapStateToProps(state) {
  return {
    routerState: state.router
  }
}


import { replaceState } from 'redux-router'

export default connect( mapStateToProps,{
  replaceState
})(Main);