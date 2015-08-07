var React = require('react');
require('../css/main.scss');

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