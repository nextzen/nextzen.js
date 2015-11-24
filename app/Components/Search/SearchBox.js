var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var categoryMap = require('./CategoryMap');

var ResultRow = require('./ResultRow');
var ResultTable = require('./ResultTable');

var Actions = require('../../actions');
var store = require('../../reducer');

var Keys = require('../Keys.js');

var SearchBox = React.createClass({

  getInitialState: function(){
    return{ 
      searchResult : [],
      searchTerm : [],
      searching : false,
      dataIndex: -1,
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

    var self = this;

    var currentDataIndex = this.state.dataIndex;
    switch(key) {
      case 13:
        if(self.props.linknode === '/maps/search/place' && self.state.dataIndex !== -1) {
          self.props.history.pushState({ },self.props.linknode,{gid: self.state.searchResult[currentDataIndex].properties["gid"], dest: self.state.searchResult[currentDataIndex].properties["name"]});
          self.deactivateSearching();
        }

      case 38:
        currentDataIndex--;
        currentDataIndex += self.state.searchResult.length;
        currentDataIndex %= self.state.searchResult.length;
        break;
      case 40:
        currentDataIndex++;
        currentDataIndex %= self.state.searchResult.length;
        break;
    }

    this.setState({
      dataIndex: currentDataIndex
    })

  },

  handleChange: function(){

     var currentType = this.refs.filterTextInput.value;
     if(currentType.length > 0) {
       var currentVal = '^(?=.*\\b' + $.trim(currentType.split(/\s+/).join('\\b)(?=.*\\b') + ').*$');
       var matchingVals = [];
       
       this.makeCall(currentType);

      //if(this.props.mapMode !== "route") this.checkCategories(currentVal,matchingVals);

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

  deactivateSearching: function() {
    this.setState({
      searching : false,
      searchTerm : []
    });
  },

  setInputValue: function(val) {
    this.setState({
      filterText : val
    },function(){
      this.refs.filterTextInput.value = val;
    });
  },

  addMarker: function(mrkr) {
    store.dispatch(this.props.pointAction(mrkr));
    this.props.addMarker(mrkr);

  },

  makeCall: function(currentInput){

    var self = this;
    if(currentInput.length > 0){
      var baseurl = 'https://search.mapzen.com/v1';
      var point = this.props.currentPoint || this.props.destPoint || this.props.startPoint || null;

      var input = currentInput;
      var radius = 50;

      var callurl = baseurl + "/autocomplete?text=" + currentInput;
      callurl += '&api_key=' + Keys.search;

      //if object is not empty object
      if(Object.keys(point).length !== 0) callurl += "&focus.point.lat=" + point.lat + "&focus.point.lon=" + point.lon;

      $.ajax({
          type:"GET",
          crossDomain: true,
          url: callurl,
          success: function(data){
            self.setState({searchResult: data.features});
          },
          error: function(){
              // when there is no search result? 
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
          onKeyDown = {this.handleKeyDown}></input>
        <ResultTable  childClassName = {this.props.childClassName}
                      mapMode = {this.props.mapMode}
                      linknode = {this.props.linknode}
                      searchTerm = {this.state.searchTerm}
                      searchData = {this.state.searchResult}
                      searching = {this.state.searching}
                      dataIndex = {this.state.dataIndex}
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