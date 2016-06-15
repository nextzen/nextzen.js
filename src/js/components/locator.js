// (c) 2015 Mapzen
//
// "Locate me" button for demos
// ----------------------------------------------------------------------------
var L = require('leaflet');

var Locator = require('leaflet.locatecontrol');

module.exports = Locator;

module.exports.locator = function (options) {
  // Geolocator
  var locator = L.control.locate({
    drawCircle: false,
    follow: false,
    showPopup: false,
    drawMarker: false,
    markerStyle: {
      opacity: 0
    },
    strings: {
      title: 'Get current location'
    },
    icon: 'mz-geolocator-icon',
    // We piggy back on geocoder plugin styles and use their load icon so it is the same.
    // Re-using the class name means we don't duplicate the embedded image style in the compiled bundle.
    iconLoading: 'mz-geolocator-icon mz-geolocator-active leaflet-pelias-search-icon leaflet-pelias-loading'
  });

  return locator;
};
