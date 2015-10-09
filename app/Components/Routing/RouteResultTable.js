var React = require('react');


var RouteResultRow = React.createClass({

  render: function(){
    var displayName = this.props.name;
    var classString = "table-view-cell route-type";
    return(
    <li className = "table-view-cell route-type"> 
      <div className = {this.props.roouteIconName} />
      {displayName} 
    </li>
    );
  }
});

var OpenButton= React.createClass({
  handleclick : function(){
    this.props.openThis();
  },

  render: function(){
    return(
      <span className="open-route-table" onClick = {this.handleclick}> 
        <span className = {(this.props.open == true)?"icon icon-down" : "icon icon-up"}></span>
      </span>
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
  openThis: function(){
    this.setState({
      open : !this.state.open
    });
  },
  formatTime: function(t /* Number (seconds) */) {
      if (t > 86400) {
        return Math.round(t / 3600) + ' h';
      } else if (t > 3600) {
        return Math.floor(t / 3600) + ' h ' +
          Math.round((t % 3600) / 60) + ' min';
      } else if (t > 300) {
        return Math.round(t / 60) + ' min';
      } else if (t > 60) {
        return Math.floor(t / 60) + ' min' +
          (t % 60 !== 0 ? ' ' + (t % 60) + ' s' : '');
      } else {
        return t + ' s';
      }
  },


  getIconName: function(i) {
    // you can find all Valhalla's direction types at https://github.com/valhalla/odin/blob/master/proto/tripdirections.proto
    switch (i) {
      case 1:
        return 'kStart';
      case 2:
        return 'kStartRight';
      case 3:
        return 'kStartLeft';
      case 4:
        return 'kDestination';
      case 5:
        return 'kDestinationRight';
      case 6:
        return 'kDestinationLeft';
      case 7:
        return 'kBecomes';
      case 8:
        return 'kContinue';
      case 9:
        return 'kSlightRight';
      case 10:
        return 'kRight';
      case 11:
        return 'kSharpRight';
      case 12:
        return 'kUturnRight';
      case 13:
        return 'kUturnLeft';
      case 14:
        return 'kSharpLeft';
      case 15:
        return 'kLeft';
      case 16:
        return 'kSlightLeft';
      case 17:
        return 'kRampStraight';
      case 18:
        return 'kRampRight';
      case 19:
        return 'kRampLeft';
      case 20:
        return 'kExitRight';
      case 21:
        return 'kExitLeft';
      case 22:
        return 'kStayStraight';
      case 23:
        return 'kStayRight';
      case 24:
        return 'kStayLeft';
      case 25:
        return 'kMerge';
      case 26:
        return 'kRoundaboutEnter';
      case 27:
        return 'kRoundaboutExit';
      case 28:
        return 'kFerryEnter';
      case 29:
        return 'kFerryExit';
    }
  },

  render: function() {

    var rows = [];
    var self = this;

    this.props.searchData.trip.legs[0].maneuvers.forEach(function(result){
      var iconName = "route-icon " + self.getIconName(result.type);
      rows.push(<RouteResultRow name = {result.instruction} 
                              key= {result.begin_shape_index} 
                              type = {result.type}
                              roouteIconName = {iconName}/>)
    });
    return(
      <ul className={(this.state.open === true )? "table-view route-table opened" :"table-view route-table closed"}>
        <li className="trip-summary table-view-cell">
         <span className = "distance"> {this.props.searchData.trip.legs[0].summary.length} km </span>
         <span className = "time"> ( {this.formatTime(this.props.searchData.trip.legs[0].summary.time)} ) </span>
        <OpenButton 
            open = {this.state.open}
            openThis = {this.openThis}/>
        </li>
        <li className = "table-view-cell route-type"> <div className ="route-icon kStart"/>Start where you are.</li>
        {rows}
      </ul>
    );
  }
});

module.exports = RouteResultTable;