'use strict';
var L = require('leaflet');

var MapControl = require('./components/mapControl');
var Bug = require('mapzen-scarab');
var Locator = require('./components/locator');
var Geocoder = require('./components/search');
var Hash = require('./components/hash');
var BasemapStyles = require('./components/basemapStyles');
var TangramLayer = require('./components/tangram');
var RoutingMachine = require('./components/routing');

console.log(RoutingMachine);

L.Mapzen = module.exports = {
  Map: MapControl,
  map: MapControl.map,
  geocoder: Geocoder.geocoder,
  locator: Locator.locator,
  routing: RoutingMachine.routing,
  bug: Bug,
  hash: Hash.hash,
  HouseStyles: BasemapStyles,
  BasemapStyles: BasemapStyles,
  _tangram: TangramLayer.tangramLayer
};

// Set Icon Path manually (Leaflet detects the path based on where Leaflet script is)
// Leaflet 0.7 and < 1.0 handle image path differently
if (parseFloat(L.version.substring(0, 3)) < 1.0) L.Icon.Default.imagePath = 'https://mapzen.com/js/images';
else L.Icon.Default.prototype.options.imagePath = 'https://mapzen.com/js/images/';
