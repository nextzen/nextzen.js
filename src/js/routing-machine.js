var lrm = require('leaflet-routing-machine');
var lrmMapzen = require('lrm-mapzen');




module.exports = MapControl;

module.exports.router = function (element, options) {
  return new MapControl(element, options);
};
