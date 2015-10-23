import React from 'react';

class Map extends Component {

      setupMap: function (point) {
      if (this.props.createMap) {
        this.map = this.props.createMap(this.getDOMNode());
      } else {
        this.map = this.createMap(document.getElementById('map'));
      }

      this.map.setView([point.lat, point.lon], 12);
    },


  render() {
    <div id="map"></div>
  }
}

module.exports = Map;