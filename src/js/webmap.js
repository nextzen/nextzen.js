'use strict';

var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);

var MapControl = require('./components/mapControl');
var Bug = require('./components/bug');
var Geocoder = require('./components/search');

L.Mapzen = module.exports = {
  map: MapControl.map,
  geocoder: Geocoder.geocoder,
  bug: Bug
};
