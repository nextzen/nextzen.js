import React from 'react';
import SearchBox from '../Search/SearchBox';
import SwapPoints from './SwapPoints';
import Actions from '../../actions/index';
import { Link } from 'react-router';

import Keys from '../Keys';

var SearchWhileRoute = React.createClass({
  render: function(){

      const { startPoint, destPoint, focusPoint, link } = this.props.config;
      const{ updateStartPoint, updateDestPoint, location } = this.props;

      const startSearchBoxConfig = {
        placeholder: 'Choose start point',
        pointAction: updateStartPoint,
        childClass: 'searchBox startPoint',
        focusPoint: focusPoint,
        link: link,
        key: Keys.search
      }

      const destSearchBoxConfig = {
        placeholder: 'Choose destination point',
        pointAction: updateDestPoint,
        childClass: 'searchBox destPoint',
        focusPoint: focusPoint,
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
        location = {location}/>
      <SearchBox 
          config = {destSearchBoxConfig}
          location = {location}/>
      <Link to = "/maps">
        <div id = "routeCancelButton" className="routeCancelButton"></div>
      </Link>
    </div>
    );
  }
})

module.exports = SearchWhileRoute;