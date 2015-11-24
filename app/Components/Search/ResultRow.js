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

    var linknode = this.props.linknode;
    if(linknode === '/maps/search/place') {
      linknode += '?gid=';
      linknode += this.props.gid;
      linknode += "&name=";
      linknode += this.props.name;
    }
    var displayName = this.props.name;

    return(
    <Link to ={linknode}> 
    <li className="table-view-cell search-result" onClick= {this.handleClick} > {displayName} </li> 
    </Link>
    );
  }
});

module.exports = ResultRow;