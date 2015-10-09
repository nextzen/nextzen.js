var React = require('react');
var $ = require('jquery');

var SearchTermRow = React.createClass({
  handleClick: function(){

    var locationArr = [];
  
    var baseurl = '//pelias.mapzen.com';
    var point = this.props.centerPoint;
    var self = this;
    var callurl = baseurl + "/reverse?lat="+point.lat+"&lon="+point.lon+"&categories= "+ this.props.searchTerm;

    $.ajax({
      type : 'GET',
      url : callurl,
      datatype:'json',
      success:function(data){
        data.features.forEach(function(datum){
          locationArr.push({
            name : datum.properties.text,
            lat : datum.geometry.coordinates[1],
            lon : datum.geometry.coordinates[0]
          });
        });
        self.props.addPOIMarkers(locationArr);
      }
    });
    self.props.setInputValue(self.props.searchTerm);
    self.props.deactivateSearching();
  },

  render: function(){

    return(
      <li className="table-view-cell serch-term-result" 
                              onClick= {this.handleClick} > {this.props.searchTerm} </li>
    );
  }
});
module.exports = SearchTermRow;