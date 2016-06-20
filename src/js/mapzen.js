'use strict';

var L = require('leaflet');

var MapControl = require('./components/mapControl');
var Bug = require('./components/bug');
var Locator = require('./components/locator');
var Geocoder = require('./components/search');
var Hash = require('./components/hash');
var TangramScript = require('./components/tangram');

L.Mapzen = module.exports = {
  map: MapControl.map,
  geocoder: Geocoder.geocoder,
  locator: Locator.locator,
  bug: Bug,
  hash: Hash.hash,
  _tangramScript: TangramScript
};

L.Mapzen.HouseStyles = {
    BubbleWrap:         'https://mapzen.com/carto/bubble-wrap-style/bubble-wrap.yaml',
    Cinnabar:           'https://mapzen.com/carto/cinnabar-style/cinnabar-style.yaml',
    CinnabarMoreLabels: 'https://mapzen.com/carto/cinnabar-style-more-labels/cinnabar-style-more-labels.yaml',
    CinnabarNoLabels:   'https://mapzen.com/carto/cinnabar-style-no-labels/cinnabar-style-no-labels.yaml',
    Refill:             'https://mapzen.com/carto/refill-style/refill-style.yaml',
    RefillMoreLabels:   'https://mapzen.com/carto/refill-style-more-labels/refill-style-more-labels.yaml',
    RefillNoLabels:     'https://mapzen.com/carto/refill-style-no-labels/refill-style-no-labels.yaml',
    Zinc:               'https://mapzen.com/carto/zinc-style/zinc-style.yaml',
    ZincMoreLabels:     'https://mapzen.com/carto/zinc-style-more-labels/zinc-style-more-labels.yaml',
    ZincNoLabels:       'https://mapzen.com/carto/zinc-style-no-labels/zinc-style-no-labels.yaml'
};
