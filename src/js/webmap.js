'use strict';

var mapControl = require('./components/mapControl');

var Geocoder = require('./components/search');
console.log(Geocoder);

window.Mapzen = module.exports = {
  map: mapControl.map,
  geocoder: Geocoder.geocoder
}
