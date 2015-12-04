import React from 'react'
import $ from 'jquery'

import categoryMap from './CategoryMap'

import ResultRow from './ResultRow'
import ResultTable from './ResultTable'

import Map from '../LeafletMap/Map'

var SearchBox = React.createClass({

  getInitialState: function(){
    return { 
      searchResult : [],
      dataIndex: -1,
      filterText: this.props.value || ""
    };
  },

  componentDidMount: function(){

    const { location } = this.props;
    const { placeholder, link } = this.props.config;

    if(link === '/maps/search/place' && (Object.keys(location.query).length !== 0)) {
      var name = location.query.name;
      this.refs.searchInput.value = name;
    } else {
      this.refs.searchInput.focus();
    }

    if(placeholder == 'Choose start point' && (Object.keys(location.query).length !== 0)) {
      var name = location.query.start.name;
      this.refs.searchInput.value = name;
      console.log(this.refs.searchInput.value);

    } else if(placeholder == 'Choose destination point' && (Object.keys(location.query).length !== 0)) {
      var name = location.query.dest.name;
      this.refs.searchInput.value = name;
    } else {
      this.refs.searchInput.focus();
    }
  },

  handleKeyDown: function(event){
    var key = event.which || event.keyCode;
    var self = this;

    var currentDataIndex = this.state.dataIndex;

    switch(key) {
      case 13:
          var data = self.state.searchResult[currentDataIndex];
          self.pointAction(data);
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

  pointAction: function(data) {

    const { pointAction } = this.props.config

    var selectedPoint = {
        name: data.properties.label,
        gid: data.properties.gid,
        lat: data.geometry.coordinates[1],
        lon: data.geometry.coordinates[0]
    };
    pointAction(selectedPoint);

    this.setInputValue(data.properties.label);
    this.setState({
      dataIndex: -1
    });
    Map.addMarker(selectedPoint);

    const { link } = this.props.config

    if( link === '/maps/search/place') {
      const { pushState } = this.props
      pushState({ }, link, {gid: selectedPoint.gid, name: selectedPoint.name});
    }
  },

  handleChange: function(){

    var currentType = this.refs.searchInput.value;
    if(currentType.length > 0) {
      var currentVal = '^(?=.*\\b' + $.trim(currentType.split(/\s+/).join('\\b)(?=.*\\b') + ').*$');
      var matchingVals = [];
       
      this.makeCall(currentType);
      this.setState({
        
        filterText : currentType
      })
    } else {
        this.setState({
          searchResult: [],
          filterText : ""
        })
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

  setInputValue: function(val) {
    this.setState({
      filterText : val
    },function(){
      this.refs.searchInput.value = val;
      this.deactivateSearching();
    });
  },

  deactivateSearching: function() {
    this.setState({
      searchTerm : [],
      searchResult: []
    });
  },

  makeCall: function(currentInput){

    var self = this;
    if(currentInput.length > 0){
      var baseurl = 'https://search.mapzen.com/v1';
      var point = this.props.focusPoint|| {};

      var input = currentInput;
      var radius = 50;

      var callurl = baseurl + "/autocomplete?text=" + currentInput;
      callurl += '&api_key=' + this.props.config.key;

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
    } else {
      self.setState({searchResult: []})
    }
  },

  render: function(){
    const { config } = this.props
    const { searchResult, dataIndex} = this.state
    return(
      <div>
        <input 
          placeholder = {config.placeholder}
          className = {config.childClass}
          ref = "searchInput" 
          type = "search" 
          id = {this.props.searchBoxId}
          value = {this.state.filterText} 
          onChange = {this.handleChange}
          onKeyDown = {this.handleKeyDown}></input>
        <ResultTable childClassName = {config.childClassName}
                      searchData = {searchResult}
                      dataIndex = {dataIndex}
                      centerPoint = {config.focusPoint}
                      pointAction = {this.pointAction} />
      </div>
    );
  }
});

module.exports = SearchBox;