var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var categoryMap = require('./CategoryMap');
require('ratchet');
require('./css/main.scss');

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
    var displayName = this.props.searchTermName;
    return(
    <li className="table-view-cell" onClick= {this.handleClick} > {displayName} </li>
    );
  }
});


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

var SearchBox = React.createClass({

  getInitialState: function(){
    return{ 
      searchResult : [],
      poiResult: [],
      searchTerm : [],
      searching : false,
      filterText: this.props.value || ""
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({filterText : newProps.value });
  },

  handleKeyDown: function(event){
    var key = event.which || event.keyCode;
    var i;
    var locationArr = [];
    if(key == 13){
      for(i = 0; i< this.state.searchResult.length; i++){

        var result = this.state.searchResult[i];

        locationArr.push({
          name: result.properties.text,
          lat: result.geometry.coordinates[1],
          lon: result.geometry.coordinates[0]
        });
      }
      this.props.addPOIMarkers(locationArr);
      this.deactivateSearching();
    }
  },

  handleChange: function(){

    var currentType = this.refs.filterTextInput.getDOMNode().value;

    for(value in categoryMap){
      for(val in categoryMap[value]){
        var searchTerm = currentType.replace(" ","_");
        if(val === searchTerm){
          this.makePOICall(categoryMap[value][val]);
        }
      }
    }

    this.makeCall(currentType);
    var searchResult = this.state.searchResult;
    this.setState({
      filterText : currentType,
      searching: true});
  },

  deactivateSearching:function(){
    this.setState({
      searching: false,
      searchTerm : [],
      poiResult : []
    });
  },

  setInputValue: function(val){
    this.setState({
      filterText : val
    },function(){
      this.refs.filterTextInput.getDOMNode().value = val;
    });

  },

  makePOICall: function(value){
    var callurl;
    var baseurl = '//pelias.mapzen.com';
    var point = this.props.currentPoint || this.props.destPoint || this.props.startPoint || null;
    if(point !== null){
      callurl = baseurl + "/reverse?lat="+point.lat+"&lon="+point.lon+"&categories?"+value;
      var resultLength = 0;
      var self = this;
      $.get(callurl,function(data){
        self.setState({
          searchTerm : [value],
         poiResult : data.features
         });
      });
    }else{
      //when there is no point to base on?
    }
  },

  makeCall: function(currentInput){

    var self = this;
    if(currentInput.length > 0){
      var baseurl = '//pelias.mapzen.com';

      var point = this.props.currentPoint || this.props.destPoint || this.props.startPoint || null;

      var input = currentInput;
      var zoom = 10;
      var searchData;

      var callurl ;

      if(point !== null) callurl = baseurl + "/suggest?input="+ currentInput+ "&lat="+point.lat+"&lon="+point.lon+"&zoom="+ zoom;
      else callurl = baseurl + "/search?input="+ currentInput;

      $.get(callurl,function(data){
          self.setState({searchResult: data.features});
        }); 
    }else{
      self.setState({searchResult: []})
    }
  },
  render: function(){
    return(
      <div>
        <input style = {this.props.style}
          tabIndex = "0"
          className="searchBox" 
          ref = "filterTextInput" 
          type = "search" 
          value = {this.state.filterText} 
          onChange = {this.handleChange}
          onKeyPress = {this.handleKeyDown}></input>
        <ResultTable  searchTerm = {this.state.searchTerm}
                      searchTermData = {this.state.poiResult}
                      searchData = {this.state.searchResult}
                      searching = {this.state.searching} 
                      addMarker = {this.props.addMarker}
                      addPOIMarkers = {this.props.addPOIMarkers}
                      setInputValue = {this.setInputValue}
                      deactivateSearching = {this.deactivateSearching} />
      </div>
    );
  }
});

module.exports = SearchBox;