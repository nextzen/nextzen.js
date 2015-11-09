var React = require('react');

require('./css/ratchet.css');
require('./css/main.scss');

var MapObject = require('./Map/MapObject');

var Main = React.createClass({

    componentDidMount: function () {
      MapObject.init();
    },

    render: function () {
      return(
        <div className="container default">
          <div id = "map" /> 
            {this.props.children}
          </div>
        );
      
    }
});

module.exports = Main;
