var React = require('react');

var ResultRow = require('./ResultRow');
var SearchTermRow = require('./SearchTermRow');

var ResultTable = React.createClass({
  render: function(){
    var currentLocationRow = [];
    var searchTermRows = [];
    var rows = [];
    var self = this;
    if(this.props.searching) {
      this.props.searchData.forEach(function(result){
        rows.push(<ResultRow name = {result.properties.label}
                             loc = {result.geometry.coordinates} 
                             key = {result.properties.id} 
                             gid = {result.properties.gid} 
                             linknode = {self.props.linknode}
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