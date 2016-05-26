'use strict';

module.exports = (function WebMap () {

  var mapControl = require('./components/mapControl');

  var webMapObj = {
    init: function (domEl, centerLatLon, zoom) {
      var map = mapControl.init(domEl, centerLatLon, zoom);
      return map;
    }
  };

  return webMapObj;
})();
