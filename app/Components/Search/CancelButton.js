var React = require('react');
var Actions = require('../../actions');
var store = require('../../reducer');
import { Link } from 'react-router';

var CancelButton = React.createClass({
  setMode : function(){
    store.dispatch(Actions.setMapModeAction('default'));
    store.dispatch(Actions.updateStartPointAction({}));
    store.dispatch(Actions.updateDestPointAction({}));
  },
  render : function(){
    return(
      <Link to = "/">
        <div className="cancelButton" onClick = {this.setMode} />
      </Link>
    );
  }
});

module.exports = CancelButton;