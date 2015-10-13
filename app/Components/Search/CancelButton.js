var React = require('react');
var Actions = require('../../actions');
var store = require('../../reducer');


var CancelButton = React.createClass({
  setMode : function(){
    store.dispatch(Actions.setMapModeAction('default'));
    store.dispatch(Actions.updateStartPointAction({}));
    store.dispatch(Actions.updateDestPointAction({}));
  },
  render : function(){
    return(
      <div className="cancelButton" onClick = {this.setMode} />
    );
  }
});

module.exports = CancelButton;