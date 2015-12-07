var React = require('react');

import { Link } from 'react-router';

var SearchButton = React.createClass({

  render : function(){
    return(
      <Link to = '/maps/search'> 
        <div className="searchButton"> 
          <span className = "searchPlaceholder"> Search addres or place. </span>
        </div>
      </Link>
    );
  }
});

module.exports = SearchButton;