import React, { Component } from 'react'

import { connect } from 'react-redux';
import { pushState } from 'redux-router'

import Keys from '../Keys'

import CancelButton from '../components/Search/CancelButton'
import SearchBox from '../components/Search/SearchBox'

class SearchWrapper extends Component {
  render () {
    const searchConfig = {
            placeholder: 'Search address or or place',
            pointAction: this.props.selectPlace,
            childClass: 'searchBox',
            focusPoint: this.props.focusPoint,
            link: this.props.link,
            key: Keys.search
          };
    return (
      <div className = "searchBoxContainer search">
        <CancelButton 
          styles = "cancelButton"
          clearPoints={this.props.clearPoints}/>
        <SearchBox
          config = {searchConfig}
          pushState = {this.props.pushState}
          location = {this.props.location}
        />
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    routerState: state.router,
    focusPoint: state.updatePoint.currentPoint || state.updatePoint.destPoint || state.updatePoint.startPoint,
    link: '/maps/search/place'
  }
}

import { selectPlace, clearPoints } from '../actions/index';

export default connect( mapStateToProps,{
  selectPlace,
  clearPoints,
  pushState
})(SearchWrapper);