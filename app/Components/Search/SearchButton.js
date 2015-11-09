var React = require('react');

var Actions = require('../../actions');
var store = require('../../reducer');

var SearchButton = React.createClass({
  setMode : function(){
    store.dispatch(Actions.setMapModeAction('search'));
  },
  render : function(){
    return(
      <div className="searchButton" onClick = {this.setMode}> 
        <span className = "searchPlaceholder"> Search addres or place. </span>
        </div>
    );
  }
});

module.exports = SearchButton;