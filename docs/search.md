Add Mapzen Search to a map
---
Mapzen.js offers a simple geocoder plugin for a web map. To use this part of Mapzen.js, you will need to sign up for a [Mapzen Search API key](https://mapzen.com/developers). The geocoder's default behavior is customized for demonstration purposes, but can be customized with the options below.

```javascript
var geocoder = L.Mapzen.geocoder('search-api-key');
geocoder.addTo(map);
```

### Query behavior

These options affect the behavior of Mapzen Search itself.

option      | description                               | default value
----------- | ----------------------------------------- | ---------------------
url | _String._ Host endpoint for a Pelias-compatible search API. | `'https://search.mapzen.com/v1'`
bounds | _[Leaflet LatLngBounds object](http://leafletjs.com/reference.html#latlngbounds)_ or _Boolean_. If `true`, search is bounded by the current map view. You may also provide a custom bounding box in form of a LatLngBounds object. _Note: `bounds` is not supported by autocomplete._ | `false`
focus | _[Leaflet LatLng object](http://leafletjs.com/reference.html#latlng)_ or _Boolean_. If `true`, search and autocomplete prioritizes results near the center of the current view. You may also provide a custom LatLng value (in any of the [accepted Leaflet formats](http://leafletjs.com/reference.html#latlng)) to act as the center bias. | `true`
layers | _String_ or _Array_. Filters results by layers ([documentation](https://mapzen.com/documentation/search/search/#filter-by-data-type)). If left blank, results will come from all available layers. | `null`
params | _Object_. An object of key-value pairs which will be serialized into query parameters that will be passed to the API. For a full list of supported parameters, please read the [Mapzen Search documentation](https://mapzen.com/documentation/search/). This allows custom queries that are not already supported by the convenience options listed above. Note that in case of conflicting parameters, this option takes precedence. All supplied parameters are passed through; this library doesn't know which are valid parameters and which are not. | `null`

### Interaction behavior

These options affect the appearance and interaction behavior of the geocoder.

option      | description                               | default value
----------- | ----------------------------------------- | ---------------------
position | _String_. Corner in which to place the geocoder control. Values correspond to Leaflet [control positions](http://leafletjs.com/reference.html#control-positions). | `'topleft'`
attribution | _String_. Attribution text to include. Set to blank or `null` to disable. | `'Geocoding by <a href="https://mapzen.com/projects/search/">Mapzen</a>'`
placeholder | _String_. Placeholder text to display in the search input box. Set to blank or `null` to disable. | `'Search'`
title | _String_. Tooltip text to display on the search icon. Set to blank or `null` to disable. | `'Search'`
panToPoint | _Boolean_. If `true`, highlighting a search result pans the map to that location. | `true`
pointIcon | _Boolean_ or _String_. If `true`, an icon is used to indicate a point result, matching the "venue" or "address" [layer types]((https://mapzen.com/documentation/search/search/#filter-by-data-type)). If `false`, no icon is displayed. For custom icons, pass a string containing a path to the image. | `true`
polygonIcon | _Boolean_ or _String_. If `true`, an icon is used to indicate a polygonal result, matching any non-"venue" or non-"address" [layer type]((https://mapzen.com/documentation/search/search/#filter-by-data-type)). If `false`, no icon is displayed. For custom icons, pass a string containing a path to the image. | `true`
markers | _[Leaflet Marker options object](http://leafletjs.com/reference.html#marker-options)_ or _Boolean_. If `true`, search results drops Leaflet's default blue markers onto the map. You may customize this marker's appearance and behavior using Leaflet [marker options](http://leafletjs.com/reference.html#marker-options). | `true`
fullWidth | _Integer_ or _Boolean_. If `true`, the input box will expand to take up the full width of the map container. If an integer breakpoint is provided, the full width applies only if the map container width is below this breakpoint. | `650`
expanded | _Boolean_. If `true`, the search input is always expanded. It does not collapse into a button-only state. | `false`
autocomplete | _Boolean_. If `true`, suggested results are fetched on each keystroke. If `false`, this is disabled and users must obtain results by pressing the Enter key after typing in their query. | `true`
place | _Boolean_. If `true`, selected results will make a request to the service [`/place` endpoint](https://mapzen.com/documentation/search/place/). If `false`, this is disabled. The geocoder does not handle responses to `/place`, you will need to do handle it yourself in the `results` event listener (see below). | `false`
