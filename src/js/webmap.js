'use strict';

var mapControl = require('./components/mapControl');
var Scarab = require('./components/scarab')
var Geocoder = require('./components/search');

window.Mapzen = module.exports = {
  map: mapControl.map,
  geocoder: Geocoder.geocoder,
  scarab: Scarab.scarab
}
