var React = require('react');
var Actions = require('../../actions');
var store = require('../../reducer');
import { Link } from 'react-router';
import MapObject from '../Map/MapObject';

var CancelButton = React.createClass({
  setMode : function(){
    store.dispatch(Actions.clearPointsAction());
    MapObject.clearMap();
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