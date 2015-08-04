var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var categoryMap = require('./CategoryMap');

var ResultRow = require('./ResultRow');
var ResultTable = require('./ResultTable');

require('ratchet');
require('../css/main.scss');

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
     var currentVal = '^(?=.*\\b' + $.trim(currentType.split(/\s+/).join('\\b)(?=.*\\b') + ').*$');
     var matchingVals = [];
     this.checkCategories(currentVal,matchingVals);

    this.searchTermCall(matchingVals);
    this.makeCall(currentType);
    var searchResult = this.state.searchResult;

    this.setState({
      filterText : currentType,
      searching: true});
    
    },

  checkCategories: function(currentVal,matchingVals){

    for(value in categoryMap){
      for(val in categoryMap[value]){
        
        var reg = RegExp(currentVal, 'i');
        if(reg.test(val)){
          matchingVals.push(categoryMap[value][val]);
          //currently suggesting two terms at maximum
          if(matchingVals.length > 2) return;
        }
      }
    }
  },

  deactivateSearching: function(){
    this.setState({
      searching : false,
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

  searchTermCall: function(values){

    var callurl;
    var self = this;

    self.setState({
      searchTerm : values
    });

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
                      centerPoint = {this.props.currentPoint || this.props.startPoint || this.props.destPoint}
                      setInputValue = {this.setInputValue}
                      deactivateSearching = {this.deactivateSearching} />
      </div>
    );
  }
});

module.exports = SearchBox;