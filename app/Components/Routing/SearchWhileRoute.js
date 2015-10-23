var React = require('react');
var SearchBox = require('../Search/SearchBox');
var SwapPoints = require('./SwapPoints');
var Actions = require('../../actions');
import { Link } from 'react-router';

var SearchWhileRoute = React.createClass({
  render: function(){
    return (
    <div className = "searchBoxContainer route">
      <SwapPoints 
        startPoint = {this.props.startPoint}
        destPoint = {this.props.destPoint}
        updateStartPointAction = {Actions.updateStartPointAction}
        updateDestPointAction = {Actions.updateDestPointAction} />
      <SearchBox 
        addMarker = {this.props.setStartPoint} 
        pointAction = {Actions.updateStartPointAction}
        value = {(this.props.startPoint !== undefined)? this.props.startPoint.name : ""}
        mapMode = "route"
        childClassName = "searchBox startPoint"
        placeholder = "Choose start point"
        destPoint = {this.props.destPoint}
        currentPoint ={this.props.currentPoint}/>
      <SearchBox 
          pointAction = {Actions.updateDestPointAction}
          addMarker = {this.props.addMarker}
          mapMode = "route"
          value = {(this.props.destPoint !== undefined)? this.props.destPoint.name : ""}
          startPoint = {this.props.startPoint}
          childClassName = "searchBox destPoint"
          placeholder = "Choose destination point"
          currentPoint ={this.props.currentPoint}/>
      <Link to = "/">
        <div id = "routeCancelButton" className="routeCancelButton" onClick= {this.props.cancleRouteMode}></div>
      </Link>
    </div>
    );
  }
})

module.exports = SearchWhileRoute;