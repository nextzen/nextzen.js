'use strict';

var L = require('leaflet');

var MapControl = require('./components/mapControl');
var Bug = require('./components/bug');
var Locator = require('./components/locator');
var Geocoder = require('./components/search');
var Hash = require('./components/hash');
var TangramScript = require('./components/tangram');
var HouseStyles = require('./components/houseStyles');

L.Mapzen = module.exports = {
  map: MapControl.map,
  geocoder: Geocoder.geocoder,
  locator: Locator.locator,
  bug: Bug,
  hash: Hash.hash,
  HouseStyles: HouseStyles,
  _tangramScript: TangramScript
};
