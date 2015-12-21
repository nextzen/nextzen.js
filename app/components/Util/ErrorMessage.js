import React from 'react';

import TimerMixin from 'react-timer-mixin';

var ErrorMessage = React.createClass({
  mixins: [TimerMixin],
  propTypes: {
    errMessage: React.PropTypes.string
  },

  getInitialState : function() {
    return {
      destroyed: false
    }
  },

  componentDidMount: function() {
    //not showing after 3 sec
    this.setTimeout(()=>
      {
        this.setState({destroyed: true})
      }, 3000);
  },

  render: function() {
    console.log(this.destroyed);
    if(!this.state.destroyed) return (
      <div className="errorMessage">
        <p> {this.props.errorMessage} </p>
      </div>
      )
    else return null;
  }
});

module.exports = ErrorMessage;
