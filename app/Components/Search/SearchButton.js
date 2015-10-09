var React = require('react');

var SearchButton = React.createClass({
  setMode : function(){
    this.props.setMapMode("search");
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