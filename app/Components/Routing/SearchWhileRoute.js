var React = require('react');
var SearchBox = require('../Search/SearchBox');

var SearchWhileRoute = React.createClass({
  render: function(){
    console.log(this.props.destPoint);
    return (
    <div className = "searchBoxContainer">
      <SearchBox 
        value = {(this.props.startPoint !== null)? this.props.startPoint.name : "Choose start point"}
        addMarker = {this.props.setStartPoint} 
        destPoint = {this.props.destPoint}
        currentPoint ={this.props.currentPoint}/>
      <SearchBox 
          value = {(this.props.destPoint !== null)? this.props.destPoint.name : " Choose detination"}
          addMarker = {this.props.addMarker}
          startPoint ={this.props.startPoint}
          currentPoint ={this.props.currentPoint}/>
    </div>
    );
  }
})

module.exports = SearchWhileRoute;