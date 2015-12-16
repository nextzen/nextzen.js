var React = require('react');

var SearchTermRow = React.createClass({
  handleClick: function(){

    //This category search doesn't work currently
    var locationArr = [];
  
    var baseurl = 'https://search.mapzen.com/v1';
    var point = this.props.centerPoint;

    var callurl = baseurl + "/reverse?lat="+point.lat+"&lon="+point.lon+"&categories= "+ this.props.searchTerm;

    var request = new XMLHttpRequest();
    request.open('GET', callurl, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        data.features.forEach((datum)=> {
          locationArr.push({
            name : datum.properties.text,
            lat : datum.geometry.coordinates[1],
            lon : datum.geometry.coordinates[0]
          });
          self.props.addPOIMarkers(locationArr);
        });
        self.props.setInputValue(self.props.searchTerm);
        self.props.deactivateSearching();
      } else {
        // when there is no search result? 
      }
    };

    request.onerror = function() {
      // when there is no search result / error? 
    };

    request.send();
  },

  render: function(){

    return(
      <li className="table-view-cell serch-term-result" 
                              onClick= {this.handleClick} > {this.props.searchTerm} </li>
    );
  }
});
module.exports = SearchTermRow;