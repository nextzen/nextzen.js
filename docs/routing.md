# Add Mapzen Turn-by-turn component to a map

mapzen.js embeds [Leaflet Routing Machine Mapzen(lrm-mapzen)](https://github.com/mapzen/lrm-mapzen) to offer a way of adding a [Mapzen turn-by-turn](https://mapzen.com/products/turn-by-turn/) routing component to a map. mapzen.js adds the routing-related components under `L.Mapzen.routing` namespace.

Example:

```javascript
  var routingControl = L.Mapzen.routing.control({
    /* pass the points to route here */
    waypoints: [
      L.latLng(37.752, -122.418),
      L.latLng(37.779, -122.391)
    ],
    router: L.Mapzen.routing.router({costing: 'auto'}),
  }).addTo(map);


```

Example of a routing component with a geocoder added:

```javascript
  var routingControl = L.Mapzen.routing.control({
    waypoints: [
      L.latLng(37.752, -122.418),
      L.latLng(37.779, -122.391)
    ],
    geocoder: L.Mapzen.routing.geocoder(),
    router: L.Mapzen.routing.router({costing: 'auto'}),
  }).addTo(map);


```

Example of a routing component with a UI panel for routing errors:

```javascript
  var routingControl = L.Mapzen.routing.control({
    waypoints: [
      L.latLng(37.752, -122.418),
      L.latLng(37.779, -122.391)
    ],
    router: L.Mapzen.routing.router({costing: 'auto'}),
  }).addTo(map);

  L.Mapzen.routing.errorControl(routingControl).addTo(map);

```
