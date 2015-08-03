var React = require('react');
require('ratchet');
require('../css/main.scss');

var ResultRow = require('./ResultRow');

var ResultTable = React.createClass({
  render: function(){
    var searchTermRows = [];
    var rows = [];
      if(this.props.searchData.length > 0 && this.props.searching ){
        var self = this;
          this.props.searchTerm.forEach(function(term){
            searchTermRows.push(<SearchTermRow
                                addPOIMarkers = {self.props.addPOIMarkers}
                                searchTermName = {self.props.searchTerm}
                                searchResult = {self.props.searchTermData}
                                deactivateSearching = {self.props.deactivateSearching}/>);
          });
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

    return(
      <ul className="table-view search-table">
        {searchTermRows}
        {rows}
      </ul>
    );
  }
});

module.exports = ResultTable;