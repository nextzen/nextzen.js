var L = require('leaflet'),
  Control = require('leaflet-routing-machine/src/control')
  // Itinerary = require('leaflet-routing-machine/src/itinerary')
  // ItineraryBuilder = require('leaflet-routing-machine/src/itinerary-builder')
  // MapzenLine = require('lrm-mapzen/src/mapzenLine')
  // Plan = require('leaflet-routing-machine/src/plan')
  // Waypoint = require('lrm-mapzen/src/waypoint')
  // MapzenFormatter = require('lrm-mapzen/src/mapzenFormatter')
  // ErrorControl = require('leaflet-routing-machine/src/error-control')
  // GeocoderElement = require('leaflet-routing-machine/src/geocoder-element')
  // MapzenRouter = require('lrm-mapzen/src/mapzenRouter')


module.exports = {
  Control: Control
  // Itinerary: Itinerary,
  // ItineraryBuilder: ItineraryBuilder,
  // Line: MapzenLine,
  // Plan: Plan,
  // Waypoint: Waypoint,
  // Mapzen: MapzenRouter,
  // Formatter: MapzenFormatter,
  // GeocoderElement: GeocoderElement
}

module.exports.routing = {
  control: function(options) { return new Control(options); },
  // itinerary: function(options) {
  //     return Itinerary(options);
  // },
  // itineraryBuilder: function(options) {
  //     return new L.Routing.ItineraryBuilder(options);
  // },
  // line: function(route, options) {
  //     return new MapzenLine(route, options);
  // },
  // plan: function(waypoints, options) {
  //     return new Plan(waypoints, options);
  // },
  // waypoint: function(latLng, name, options) {
  //     return new Waypoint(latLng, name, options);
  // },
  // formatter: function(options) {
  //     return new MapzenFormatter(options);
  // },
  // mapzen: function(apikey, options) {
  //   return new MapzenRouter(apikey, options);
  // },
  // geocoderElement: function(wp, i, nWps, plan) {
  //     return new GeocoderElement(wp, i, nWps, plan);
  // },
  // errorControl: function(routingControl, options) {
  //     return new L.Routing.ErrorControl(routingControl, options);
  // }
};