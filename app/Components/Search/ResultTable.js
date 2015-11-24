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
      var rowIndex = 0;
      this.props.searchData.forEach(function(result){
        rows.push(<ResultRow name = {result.properties.label}
                             loc = {result.geometry.coordinates} 
                             key = {result.properties.id} 
                             rowIndex = {rowIndex}
                             dataIndex = {self.props.dataIndex}
                             gid = {result.properties.gid} 
                             linknode = {self.props.linknode}
                             addMarker = {self.props.addMarker} 
                             setInputValue = {self.props.setInputValue}
                             deactivateSearching = {self.props.deactivateSearching}/>);
        rowIndex++;
      });
    }

    var classString =  "table-view search-table ";
    classString += this.props.childClassName;

    return(
      <ul
        className = {classString}>
        {currentLocationRow}
        {searchTermRows}
        {rows}
      </ul>
    );
  }
});

module.exports = ResultTable;