var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var categoryMap = require('./CategoryMap');

var ResultRow = require('./ResultRow');
var ResultTable = require('./ResultTable');
var LocationInformation = require('./LocationInformation');


var Actions = require('../../actions');
var store = require('../../reducer');

var SearchBox = React.createClass({

  getInitialState: function(){
    return{ 
      searchResult : [],
      searchTerm : [],
      searching : false,
      filterText: this.props.value || ""
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({filterText : newProps.value });
  },

  componentDidMount: function(){

    var searchBoxId = this.props.searchBoxId;
    if(searchBoxId) document.getElementById(searchBoxId).focus();
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
     if(currentType.length > 0) {
       var currentVal = '^(?=.*\\b' + $.trim(currentType.split(/\s+/).join('\\b)(?=.*\\b') + ').*$');
       var matchingVals = [];
       
       this.makeCall(currentType);

      if(this.props.mapMode !== "route") this.checkCategories(currentVal,matchingVals);

      this.setState({
        searchTerm: matchingVals,
        filterText : currentType,
        searching: true});
      }else{
        this.setState({
        searchTerm: "",
        filterText : "",
        searching: false});
      }
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
      searchTerm : []
    });
  },

  setInputValue: function(val){
    this.setState({
      filterText : val
    },function(){
      this.refs.filterTextInput.getDOMNode().value = val;
    });
  },

  addMarker: function(mrkr){

    store.dispatch(this.props.pointAction(mrkr.name, mrkr.lat, mrkr.lon));
    this.props.addMarker(mrkr);
    if(this.props.childClassName === "searchBox") React.render(<LocationInformation 
                  markedLocation = {mrkr}
                  setMapMode = {this.props.setMapMode}/>, document.getElementById('locationInfoContainer'));

  },

  makeCall: function(currentInput){

    var self = this;
    if(currentInput.length > 0){
      var baseurl = 'https://pelias.mapzen.com';

      var point = this.props.currentPoint || this.props.destPoint || this.props.startPoint || null;

      var input = currentInput;
      var zoom = 10;
      var searchData;

      var callurl ;

      if(point !== null) callurl = baseurl + "/suggest?input="+ currentInput+ "&lat="+point.lat+"&lon="+point.lon+"&zoom="+ zoom;
      else callurl = baseurl + "/suggest?input="+ currentInput;

      $.ajax({          
          type:"GET",
          dataType: "jsonp",
          crossDomain: true,
          url: callurl,
          success: function(data){
            self.setState({searchResult: data.features});
          },
          error: function(){//do nothing
          }
      });
    }else{
      self.setState({searchResult: []})
    }
  },
  render: function(){
    return(
      <div>
        <input style = {this.props.style}
          placeholder = {this.props.placeholder}
          className = {this.props.childClassName}
          ref = "filterTextInput" 
          type = "search" 
          id = {this.props.searchBoxId}
          value = {this.state.filterText} 
          onChange = {this.handleChange}
          onKeyPress = {this.handleKeyDown}></input>
        <ResultTable  childClassName = {this.props.childClassName}
                      mapMode = {this.props.mapMode}
                      searchTerm = {this.state.searchTerm}
                      searchData = {this.state.searchResult}
                      searching = {this.state.searching} 
                      addMarker = {this.addMarker}
                      addPOIMarkers = {this.props.addPOIMarkers}
                      centerPoint = {this.props.currentPoint || this.props.startPoint || this.props.destPoint}
                      setInputValue = {this.setInputValue}
                      deactivateSearching = {this.deactivateSearching} />
      </div>
    );
  }
});

module.exports = SearchBox;