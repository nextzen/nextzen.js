var React = require('react');
require('ratchet');
require('./css/main.css');


var RouteResultRow = React.createClass({

  render: function(){
    var displayName = this.props.name;
    return(
    <li className="table-view-cell route-type {this.props.type}"> {displayName} </li>
    );
  }
});

var OpenButton= React.createClass({
  handleclick : function(){
    console.log("open!");
    this.props.openThis();
  },

  render: function(){
    return(
      <div className="open-route-table" onClick = {this.handleclick}> 
        <span className = {(this.props.open == true)?"icon icon-down" : "icon icon-up"}></span>
      </div>
    );
  }
});

var RouteResultTable = React.createClass({
  propTypes: {
    config: React.PropTypes.object,
    stopped: React.PropTypes.bool
  },
  getInitialState:function(){
    return{
      open : false
    }
  },

  componentDidMount: function() {
  },

  componentWillReceiveProps: function(newProps) {
  },

  componentWillUnmount: function() {
  },
  openThis: function(){
    this.setState({
      open : !this.state.open
    });
  },

  render: function() {

    var rows = [];
    var self = this;

      this.props.searchData.trip.legs[0].maneuvers.forEach(function(result){
        rows.push(<RouteResultRow name = {result.instruction} 
                               key= {result.begin_shape_index} 
                               type = {result.type}/>)
        });
    return(
      <ul className={(this.state.open === true )? "table-view route-table opened" :"table-view route-table closed"}>
        <OpenButton 
         open = {this.state.open}
         openThis = {this.openThis}/>
        <li className="trip-summary table-view-cell">
        {this.props.searchData.trip.legs[0].summary.length} km , {this.props.searchData.trip.legs[0].summary.time}
        </li>
        {rows}
      </ul>
    );
  }
});

module.exports = RouteResultTable;