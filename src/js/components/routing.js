var L = require('leaflet'),
  Control = require('leaflet-routing-machine/src/L.Routing.Control')
  Itinerary = require('leaflet-routing-machine/src/L.Routing.Itinerary')
  ItineraryBuilder = require('leaflet-routing-machine/src/L.Routing.ItineraryBuilder')
  MapzenLine = require('lrm-mapzen/src/L.Routing.MapzenLine')
  Plan = require('leaflet-routing-machine/src/L.Routing.Plan')
  Waypoint = require('leaflet-routing-machine/src/L.Routing.Waypoint')
  MapzenFormatter = require('lrm-mapzen/src/L.Routing.MapzenFormatter')
  ErrorControl = require('leaflet-routing-machine/src/L.Routing.ErrorControl')
  GeocoderElement = require('leaflet-routing-machine/src/L.Routing.GeocoderElement')
  MapzenRouter = require('lrm-mapzen/src/L.Routing.Mapzen')




module.exports = {
  Control: Control,
  Itinerary: Itinerary,
  ItineraryBuilder: ItineraryBuilder,
  Line: MapzenLine,
  Plan: Plan,
  Waypoint: Waypoint,
  Mapzen: MapzenRouter,
  Formatter: MapzenFormatter,
  GeocoderElement: GeocoderElement
}

module.exports.routing = {
  control: function(options) { return new Control(options); },
  itinerary: function(options) {
      return Itinerary(options);
  },
  itineraryBuilder: function(options) {
      return new L.Routing.ItineraryBuilder(options);
  },
  line: function(route, options) {
      return new MapzenLine(route, options);
  },
  plan: function(waypoints, options) {
      return new Plan(waypoints, options);
  },
  waypoint: function(latLng, name, options) {
      return new Waypoint(latLng, name, options);
  },
  formatter: function(options) {
      return new MapzenFormatter(options);
  },
  mapzen: function(options) {
    return new MapzenRouter(options);
  },
  geocoderElement: function(wp, i, nWps, plan) {
      return new GeocoderElement(wp, i, nWps, plan);
  },
  errorControl: function(routingControl, options) {
      return new L.Routing.ErrorControl(routingControl, options);
  }
};