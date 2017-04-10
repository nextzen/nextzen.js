// Copyright (c) 2016 Dominik Moritz
// This code is the body  of Leaflet LocateControl https://github.com/domoritz/leaflet-locatecontrol
// Mapzen.js detached the commonJS part embedding Leaflet inside of Leaflet Locate Control and trimeed to follow MapzenJS lint rule

var L = require('leaflet');
var Locator = require('leaflet.locatecontrol');

module.exports = Locator;

module.exports.locator = function (opts) {
  var mapzenOptions = {
    position: 'bottomright',
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
  };

  var extendedOptions = L.extend({}, mapzenOptions, opts);
  var locator = new Locator(extendedOptions);

  return locator;
};
