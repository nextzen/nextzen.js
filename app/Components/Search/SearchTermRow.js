var React = require('react');
require('ratchet');
require('../css/main.scss');

var SearchTermRow = React.createClass({
  handleClick: function(){
    var locationArr = [];
    for(i = 0; i< this.props.searchResult.length; i++){

      var result = this.props.searchResult[i];

      locationArr.push({
        name: result.properties.text,
        lat: result.geometry.coordinates[1],
        lon: result.geometry.coordinates[0]
      });
    }
    this.props.addPOIMarkers(locationArr);
    this.props.deactivateSearching();
  },

  render: function(){


    return(

      <li className="table-view-cell serch-term-result" 
                              onClick= {this.handleClick} > {this.props.searchTerm} </li>

    );
  }
});
module.exports = SearchTermRow;