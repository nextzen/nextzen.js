var React = require('react');

var TestUnit = React.createClass({

  getInitialState: function(){
    return null;
  },


  componentDidMount: function () {
    console.log("being called");
  },

  render: function () {

    return(
       <div>
         <h1> what is life child</h1>
       </div>
     );
    }
});

module.exports = TestUnit;
