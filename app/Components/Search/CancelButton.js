var React = require('react');
var Actions = require('../../actions');
var store = require('../../reducer');
import { Link } from 'react-router';

var CancelButton = React.createClass({
  setMode : function(){
    store.dispatch(Actions.clearPointsAction());
  },
  render : function(){
    return(
      <Link to = "/maps">
        <div className="cancelButton" onClick = {this.setMode} />
      </Link>
    );
  }
});

module.exports = CancelButton;