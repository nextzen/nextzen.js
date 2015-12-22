import React,{propTypes} from 'react';
import SearchBox from '../Search/SearchBox';
import SwapPoints from './SwapPoints';
import CancelButton from '../Search/CancelButton'
import { Link } from 'react-router';

import Keys from '../Keys';

var SearchWhileRoute = React.createClass({

  render: function(){

      const { startPoint, destPoint, link } = this.props.config;
      const{ updateStartPoint, updateDestPoint, location } = this.props;

      const startSearchBoxConfig = {
        placeholder: 'Choose start point',
        pointAction: updateStartPoint,
        childClass: 'searchBox startPoint',
        focusPoint: destPoint || startPoint || {},
        link: link,
        key: Keys.search
      }

      const destSearchBoxConfig = {
        placeholder: 'Choose destination point',
        pointAction: updateDestPoint,
        childClass: 'searchBox destPoint',
        focusPoint: startPoint || destPoint || {},
        link: '/maps/direction',
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
        label = {startPoint.title}
        location = {location}/>
      <SearchBox 
          config = {destSearchBoxConfig}
          label = {destPoint.title}
          location = {location}/>
      <CancelButton
        styles={(this.props.spinning)? '':'routeCancelButton'}
        clearPoints={this.props.clearPoints}/>
    </div>
    );
  }
})

module.exports = SearchWhileRoute;