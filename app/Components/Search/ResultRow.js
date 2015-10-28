import React from 'react';
import { Link } from 'react-router';

var ResultRow = React.createClass({
  handleClick: function(){

    var markerToMap = {
      name : this.props.name,
      lat : this.props.loc[1],
      lon : this.props.loc[0]
    };
    
    this.props.addMarker(markerToMap);
    this.props.setInputValue(this.props.name);
    this.props.deactivateSearching();
  },

  render: function(){
    var displayName = this.props.name;
    return(
    <Link to = "/search/place"> <li className="table-view-cell search-result" onClick= {this.handleClick} > {displayName} </li> </Link>
    );
  }
});

module.exports = ResultRow;