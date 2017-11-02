# Add Mapzen Search box to a map

mapzen.js includes options for adding a [Mapzen Search](https://mapzen.com/documentation/search/) geocoder box to a map.

Example:

```javascript
var geocoder = L.Mapzen.geocoder();
geocoder.addTo(map);
```

## API key

[Mapzen Search](https://mapzen.com/documentation/search/) requires an [API key](https://mapzen.com/developers) to work properly. The above example assumes you've set up a [global 'apiKey'](https://mapzen.com/documentation/mapzen-js/api-reference/#api-key) prior to defining the geocoder:

```javascript
L.Mapzen.apiKey = 'your-mapzen-api-key';

var geocoder = L.Mapzen.geocoder();
geocoder.addTo(map);
```

This global key is used for all of Mapzen services. If you'd rather use a separate key for the geocoder component, you can pass a different key when you set up the geocoder:

```javascript
var geocoder = L.Mapzen.geocoder('your-other-mapzen-api-key');
geocoder.addTo(map);
```

[Mapzen Search rate limits](https://mapzen.com/documentation/overview/#rate-limits) apply.

## Options

In addition to the API key, you may also pass a set of options to the geocoder to control its appearance and behavior.

Example:

```javascript
var geocoderOptions = {
  autocomplete: false
};

var geocoder = L.Mapzen.geocoder('your-mapzen-api-key', geocoderOptions);
geocoder.addTo(map);
```

Below is a full list of available options.

### Control the search query behavior

These options affect the behavior of Mapzen Search itself.

| Option  | Type   | Default | Description                      |
|---------|--------|---------|----------------------------------|
`url` | String | `https://search.mapzen.com/v1` | Host endpoint for a Pelias-compatible search API.
`bounds` | [LatLngBounds](http://leafletjs.com/reference.html#latlngbounds) or Boolean | `false` | If `true`, search is bounded by the current map view. You may also provide a custom bounding box in the form of a [Leaflet LatLngBounds object](http://leafletjs.com/reference.html#latlngbounds). _Note: `bounds` is not supported by autocomplete._
`focus` | [LatLng](http://leafletjs.com/reference.html#latlng) or Boolean | `true` | If `true`, search and autocomplete prioritize results near the center of the current view. You may also provide a custom [Leaflet LatLng](http://leafletjs.com/reference.html#latlng) value (in any of the [accepted Leaflet formats](http://leafletjs.com/reference.html#latlng)) to act as the center bias.
`layers` | String or Array | `null` | Filters results by [layers](https://mapzen.com/documentation/search/search/#filter-by-data-type). If left blank, results will come from all available layers.
`params` | Object | `null` | An object of key-value pairs which will be serialized into query parameters that will be passed to the Mapzen Search API. This allows custom queries that are not already supported by the convenience options listed above. Note that in case of conflicting parameters, this option takes precedence. All supplied parameters are passed through; this library doesn't know which are valid parameters and which are not. See [available search parameters](https://mapzen.com/documentation/search/search/#available-search-parameters).

### Set the search appearance and interaction behavior

These options affect the appearance and interaction behavior of the geocoder.

| Option  | Type   | Default | Description                      |
|---------|--------|---------|----------------------------------|
`autocomplete` | Boolean | `true` | If `true`, suggested results are fetched on each keystroke. If `false`, this is disabled and users must obtain results by pressing the Enter key after typing in their query.
`collapsible` | Boolean | `true`  | If `true`, the search box will collapse when screen width is less than 900 pixels. If `false`, this is disabled and search box will remain in its initial state. |
`expanded` | Boolean | `true` | If `true`, the search box will be expanded on initial page load.
`position` | String | `'topleft'` | Corner in which to place the geocoder control. Values correspond to [Leaflet control positions](http://leafletjs.com/reference.html#control-positions).
`placeholder` | String | `'Search'` | Placeholder text to display in the search input box. Set to blank or `null` to disable.
`title` | String | `'Search'` | Tooltip text to display on the search button when collapsed. Set to blank or `null` to disable.
`panToPoint` | Boolean | `true` | If `true`, highlighting a search result pans the map to that location.
`pointIcon` | Boolean or String | `true` | If `true`, an icon is used to indicate a point result, matching the `venue` or `address` [layer types]((https://mapzen.com/documentation/search/search/#filter-by-data-type)). If `false`, no icon is displayed. For custom icons, pass a string containing a path to the image.
`polygonIcon` | Boolean or String | `true` | If `true`, an icon is used to indicate a polygonal result, matching any [layer type](https://mapzen.com/documentation/search/search/#filter-by-data-type) that is not an address or venue. If `false`, no icon is displayed. For custom icons, pass a string containing a path to the image.
`markers` | [Marker options](http://leafletjs.com/reference.html#marker-options) or Boolean | `true` | If `true`, search results drops Leaflet's default blue markers onto the map. You may customize this marker's appearance and behavior using [Leaflet marker options](http://leafletjs.com/reference.html#marker-options).
`fullWidth` | Integer or Boolean | `650` | If `true`, the input box will expand to take up the full width of the map container. If an integer breakpoint is provided, the full width applies only if the map container width is below this breakpoint. Integer unit is pixels.
`place` | Boolean | `false` | If `true`, selected results will make a request to the service [`/place` endpoint](https://mapzen.com/documentation/search/place/). If `false`, this is disabled. The geocoder does not handle responses to `/place`; you will need to do handle it yourself in the `results` event listener.


## Methods

If you want to implement your own search UI, or want to use search result without the built-in UI component, you can use these methods.

| Option  | Return | Description                      |
|---------|---------|----------------------------------|
`getSearchResult (<String>input, <function> callback)` | null | Executes `callback(err, result)` with the search result from `input`. The `result` is in GeoJSON format. |
`getAutocompleteResult(<String>input, <function> callback)` | null |  Executes `callback(err, result)` with the autocomplete result from `input`. The `result` is in GeoJSON format.|
