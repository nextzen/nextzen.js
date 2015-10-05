var React = require('react');

var CancelButton = React.createClass({
  setMode : function(){
    this.props.setMapMode("default");
  },
  render : function(){
    return(
      <div className="cancelButton" onClick = {this.setMode} />
    );
  }
});

module.exports = CancelButton;