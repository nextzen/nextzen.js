var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
require('ratchet');
require('./css/main.css');

var ResultRow = React.createClass({
  handleClick: function(){
    //var marker = L.marker(this.props.loc.reverse());
    //marker.bindPopup(this.props.name);
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
          var displayName = result.properties.name;
          if(result.properties.local_admin) displayName += " , " + result.properties.local_admin;
          if(result.properties.admin1_abbr) displayName += " , " + result.properties.admin1_abbr;
          else if(result.properties.admin0) displayName += " , " + result.properties.admin0;
          rows.push(<ResultRow name = {displayName}
                               loc = {result.geometry.coordinates} 
                               key = {result.properties.id} 
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
//  mixinsL [Router.navigation],

  getInitialState: function(){
    return{ 
      searchResult : [],
      searching : false,
      filterText: this.props.value || ""
    };
  },

  handleKeyDown: function(event){
    var key = event.which || event.keyCode;
    var i;
    var locationArr = [];
    for(i = 0; i< this.state.searchResult.length; i++){
      locationArr.push({
        lat: this.state.searchResult[i].geometry.coordinates[1],
        lon: this.state.searchResult[i].geometry.coordinates[0]
      });
    }
    if(key == 13){
      this.props.addPOIMarkers(locationArr);
      this.deactivateSearching();
    }
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
    this.setState({
      filterText : val
    });
    this.refs.filterTextInput.getDOMNode().value = val;
  },

  makeCall: function(currentInput){
    // pelias api form : https://pelias.mapzen.com/suggest?bbox=-74.18861389160156,40.62802447679272,-73.79173278808594,40.86134282702074&input=we+are
    var self = this;
    if(currentInput.length > 0){
      var baseurl = '//pelias.mapzen.com';
      //default bbox is new york
      var bbox = this.props.bbox || '-74.2589, 40.4774, -73.7004, 40.9176';
      var lat = this.props.currentPoint.lat || null;
      var lon = this.props.currentPoint.lon || null;
      var input = currentInput;
      var zoom = 12;
      var searchData;

      var callurl ;
      //if(lat) callurl = baseurl + "/search?bbox=" + bbox + "&input="+ currentInput+ "&lat="+lat+"&lon="+lon+"&zoom="+ zoom;
     // else callurl = baseurl + "/search?bbox=" + bbox + "&input="+ currentInput;

     if(lat != null) callurl = baseurl + "/search?input="+ currentInput+ "&lat="+lat+"&lon="+lon+"&zoom="+ zoom;
     else callurl = baseurl + "/search?input="+ currentInput;

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
        tabIndex = "0"
        className="searchBox" 
        ref = "filterTextInput" 
        type = "search" 
        value = {this.state.filterText} 
        onChange = {this.handleChange}
        onKeyPress = {this.handleKeyDown}
        ></input>
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