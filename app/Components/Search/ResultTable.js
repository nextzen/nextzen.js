var React = require('react');
require('ratchet');
require('../css/main.scss');

var ResultRow = require('./ResultRow');
var SearchTermRow = require('./SearchTermRow');

var ResultTable = React.createClass({
  render: function(){
    var currentLocationRow = [];
    var searchTermRows = [];
    var rows = [];
    var self = this;
    if(this.props.searching){
      if(this.props.mapMode !== "route"){
          if(this.props.centerPoint !== undefined){
              this.props.searchTerm.forEach(function(term){
                searchTermRows.push(<SearchTermRow
                                    addPOIMarkers = {self.props.addPOIMarkers}
                                    searchTerm = {term}
                                    centerPoint = {self.props.centerPoint}
                                    setInputValue = {self.props.setInputValue}
                                    deactivateSearching = {self.props.deactivateSearching}/>);
            });
          }
        }else{
          currentLocationRow.push(<li className="table-view-cell currentLocation"> current location </li>);
        }
          this.props.searchData.forEach(function(result){
            var displayName = result.properties.text;
            rows.push(<ResultRow name = {displayName}
                                 loc = {result.geometry.coordinates} 
                                 key = {result.properties.id} 
                                 addMarker = {self.props.addMarker} 
                                 setInputValue = {self.props.setInputValue}
                                 deactivateSearching = {self.props.deactivateSearching}/>)
          });
    }

    var classString =  "table-view search-table ";
    classString += this.props.childClassName;

    return(
      <ul className = {classString}>
        {currentLocationRow}
        {searchTermRows}
        {rows}
      </ul>
    );
  }
});

module.exports = ResultTable;