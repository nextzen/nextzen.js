'use strict';
var Raven = require('raven-js');
Raven.config('https://c339a8f48a5d48d1b1b7908b84684082@app.getsentry.com/78663').install();

var L = require('leaflet');

var MapControl = require('./components/mapControl');
var Bug = require('./components/bug');
var Locator = require('./components/locator');
var Geocoder = require('./components/search');
var Hash = require('./components/hash');
var BasemapStyles = require('./components/basemapStyles');
var TangramLayer = require('./components/tangram');

L.Mapzen = module.exports = {
  map: MapControl.map,
  geocoder: Geocoder.geocoder,
  locator: Locator.locator,
  bug: Bug,
  hash: Hash.hash,
  HouseStyles: BasemapStyles,
  BasemapStyles: BasemapStyles,
  _tangram: TangramLayer.tangramLayer
};
