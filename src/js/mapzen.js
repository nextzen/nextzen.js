'use strict';

var L = require('leaflet');

var MapControl = require('./components/mapControl');
var Bug = require('./components/bug');
var Locator = require('./components/locator');
var Geocoder = require('./components/search');
var Hash = require('./components/hash');
var BasemapStyles = require('./components/basemapStyles');
var TangramLayer = require('./components/tangram');

L.Mapzen = module.exports = {
  Map: MapControl,
  map: MapControl.map,
  geocoder: Geocoder.geocoder,
  locator: Locator.locator,
  bug: Bug,
  hash: Hash.hash,
  HouseStyles: BasemapStyles,
  BasemapStyles: BasemapStyles,
  _tangram: TangramLayer.tangramLayer
};

// Set Icon Path manually (Leaflet detects the path based on where Leaflet script is)
L.Icon.Default.imagePath = 'https://mapzen.com/js/images';
