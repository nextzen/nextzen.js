'use strict';

var MapControl = require('./components/mapControl');
var Bug = require('./components/bug');
var Geocoder = require('./components/search');

window.Mapzen = module.exports = {
  map: MapControl.map,
  geocoder: Geocoder.geocoder,
  bug: Bug
};
