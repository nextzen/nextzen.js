var React = require('react');
var SearchBox = require('../Search/SearchBox');
var SwapPoints = require('./SwapPoints');
var SearchWhileRoute = React.createClass({
  render: function(){
    return (
    <div className = "searchBoxContainer route">
      <SwapPoints 
        startPoint = {this.props.startPoint}
        destPoint = {this.props.destPoint}
        setStartPoint = {this.props.setStartPoint}
        setDestPoint = {this.props.addMarker}/>
      <SearchBox 
        value = {(this.props.startPoint !== null)? this.props.startPoint.name : "Choose start point"}
        addMarker = {this.props.setStartPoint} 
        mapMode = "route"
        childClassName = "searchBox startPoint"
        placeholder = "Choose start point"
        destPoint = {this.props.destPoint}
        currentPoint ={this.props.currentPoint}/>
      <SearchBox 
          value = {(this.props.destPoint !== null)? this.props.destPoint.name : " Choose detination"}
          addMarker = {this.props.addMarker}
          mapMode = "route"
          startPoint ={this.props.startPoint}
          childClassName = "searchBox destPoint"
          placeholder = "Choose destination point"
          currentPoint ={this.props.currentPoint}/>
      <div className="routeCancelButton" onClick= {this.props.cancleRouteMode}></div>
    </div>
    );
  }
})

module.exports = SearchWhileRoute;