var React = require('react');

var SwapPoints = React.createClass({
  swapPoints: function(){
    var tempPoint = this.props.startPoint;
    this.props.setStartPoint(this.props.destPoint);
    this.props.setDestPoint(tempPoint);
  },
  render: function(){
    return (
    <div className = "swapPoints"
          onClick= {this.swapPoints} />
    );
  }
})

module.exports = SwapPoints;