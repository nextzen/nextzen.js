var React = require('react');

var Actions = require('../../actions');
var store = require('../../reducer');

import { Link } from 'react-router';

var SearchButton = React.createClass({

  setMode : function(){
    store.dispatch(Actions.setMapModeAction('search'));
  },

  render : function(){
    return(
      <Link to = '/maps/search'> 
        <div className="searchButton" onClick = {this.setMode}> 
          <span className = "searchPlaceholder"> Search addres or place. </span>
        </div>
      </Link>
    );
  }
});

module.exports = SearchButton;