import React from 'react';

var ErrorMessage = React.createClass({

  propTypes: {
    errMessage: React.PropTypes.string
  },
  render: function() {
    return(
      <div className="errorMessage">
        <p> {this.props.errorMessage} </p>
      </div>
      )
  }

});

module.exports = ErrorMessage;
