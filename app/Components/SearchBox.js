var React = require('react');
var $ = require('jquery');
require('ratchet');
require('./css/main.css');


var ResultRow = React.createClass({
  handleClick: function(){
    var marker = L.marker(this.props.loc.reverse());
    marker.bindPopup(this.props.name);
    var markerToMap = {
      name : this.props.name,
      lat : marker.getLatLng().lat,
      lon : marker.getLatLng().lng
    };
    this.props.addMarker(markerToMap);
    this.props.setInputValue(this.props.name);
    this.props.deactivateSearching();
  },
  render: function(){
    var displayName = this.props.name;
    return(
    <li className="table-view-cell" onClick= {this.handleClick} > {displayName} </li>
    );
  }
});

var ResultTable = React.createClass({
  render: function(){
    var rows = [];
      if(this.props.searchData.length > 0 && this.props.searching ){
        var self = this;
        this.props.searchData.forEach(function(result){
          rows.push(<ResultRow name = {result.properties.name} 
                               loc= {result.geometry.coordinates} 
                               key= {result.properties.id} 
                               addMarker = {self.props.addMarker} 
                               searching = {self.props.searching}
                               setInputValue = {self.props.setInputValue}
                               deactivateSearching = {self.props.deactivateSearching}/>)
        });
    }

    return(
      <ul className="table-view search-table">
        {rows}
      </ul>
    );
  }
});



var SearchBox = React.createClass({

  getInitialState: function(){
    return{ 
      searchResult : [],
      searching : false,
      filterText: this.props.value || ""
    };
  },

  handleChange: function(){
    var currentType = this.refs.filterTextInput.getDOMNode().value;
    this.makeCall(currentType);
    var searchResult = this.state.searchResult;
    this.setState({
      filterText : currentType,
      searching: true});
  },

  deactivateSearching:function(){
    this.setState({searching: false});
  },

  setInputValue: function(val){
    this.refs.filterTextInput.getDOMNode().value = val;
  },

  makeCall: function(currentInput){
    // pelias api form : https://pelias.mapzen.com/suggest?bbox=-74.18861389160156,40.62802447679272,-73.79173278808594,40.86134282702074&input=we+are&lat=40.7448&lon=-73.9902&size=10&zoom=12
    var self = this;
    if(currentInput.length > 0){
      var baseurl = '//pelias.mapzen.com';
      var bbox = '-74.18861389160156,40.62802447679272,-73.79173278808594,40.86134282702074';
      var input = currentInput;
      var lat = '40.744';
      var lon = '-73.990';
      var zoom = 12;
      var searchData;

      var callurl = baseurl + "/suggest?bbox=" + bbox + "&input="+ currentInput + "&lat="+lat+"&lon="+lon+"&zoom="+ zoom;
    $.get(callurl,function(data){
      //this is not the way react recommends
      self.setState({searchResult: data.features});
    });
  }else{
    self.setState({searchResult: []})
  }

  },

  render: function(){
    var secondaryStyle = {
      top : 50
    };
    return(
      <div>
        <input style = {this.props.style}
        className="searchBox" 
        ref = "filterTextInput" 
        type = "search" 
        value = {this.state.filterText} 
        onChange={this.handleChange}></input>
        <ResultTable searchData = {this.state.searchResult}
                      searching = {this.state.searching} 
                      addMarker = {this.props.addMarker}
                      setInputValue = {this.setInputValue}
                      deactivateSearching = {this.deactivateSearching} />
      </div>
    );
  }
});

module.exports = SearchBox;