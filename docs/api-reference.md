# API reference

mapzen.js is an open-source JavaScript SDK and an extension of [Leaflet](http://leafletjs.com/) for making maps for the web and mobile devices. mapzen.js simplifies the process of using Mapzen's maps within Leaflet.

## Draw a map

`L.Mapzen.map` extends [Leaflet `L.Map`](http://leafletjs.com/reference.html#map-class) with additional options for displaying Mapzen's basemaps using the [Tangram rendering engine](https://mapzen.com/products/tangram/).

You can pass Mapzen's default basemaps for the `scene`, or you can link to your own path to a scene file for Tangram.

If there is no scene file declared, you need to set your own tile to display the map.

```javascript
var map = L.Mapzen.map('map', {
  center: [40.74429, -73.99035],
  zoom: 15,
  scene: L.Mapzen.BasemapStyles.Refill
})
```

The `center:` parameter sets the center point of the map, in decimal degrees. The next line sets the `zoom` level, which is like a map scale or resolution, where a smaller value shows a larger area in less detail, and a larger zoom level value depicts smaller area in great detail.

The `scene: L.Mapzen.BasemapStyles.BubbleWrap` line sets the style used for the map. In this case, it is Mapzen's all-purpose stylesheet called BubbleWrap.

| Option  | Type   | Default                           | Description                                                   |
|---------|--------|-----------------------------------|---------------------------------------------------------------|
| `scene` | String | `L.Mapzen.BasemapStyles.BubbleWrap` | Tangram scene URL, included in `L.Mapzen.BasemapStyles` object. <br> `scene` can also be a single-quoted URL that points to any `.yaml` Tangram scene file |
| `fallBackTile` | [L.TileLayer](http://leafletjs.com/reference.html#tilelayer) | `L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {})` | TileLayer to fall back when WebGL is not available. |
| `attribution` | String | `<a href="https://mapzen.com">Mapzen</a> - <a href="https://www.mapzen.com/rights">Attribution</a>, Data ©<a href="https://openstreetmap.org/copyright">OSM</a> contributors` | Attribution data  in a small text box.`Leaflet` attribution is always there; attribution from this option is placed before `Leaflet` attribution.|

For access to [Tangram’s `scene` object](https://mapzen.com/documentation/tangram/Javascript-API/#scene) (interface for controlling your Tangram scene at runtime), listen for the `tangramloaded` event on the map. It is available as a property of the Tangram Leaflet layer, which you will find in the event property `tangramLayer`.

```
map.on('tangramloaded', function(event) {
  event.tangramLayer;
});
```

## Basemap styles

mapzen.js has constants for [Mapzen basemaps](https://mapzen.com/products/maps/) under the `L.Mapzen.BasemapStyles` namespace to make it easy to access to them. You can pass `L.Mapzen.BasemapStyles` as a `scene` option for the `L.Mapzen.map` instance.

```javascript
var map = L.Mapzen.map('map', {
  scene: L.Mapzen.BasemapStyles.Refill
})
```

| Constant                                  | Value                                                                                  |
|-------------------------------------------|----------------------------------------------------------------------------------------|
| `L.Mapzen.BasemapStyles.BubbleWrap`         | `https://mapzen.com/carto/bubble-wrap-style/bubble-wrap.yaml`                          |
| `L.Mapzen.BasemapStyles.Cinnabar`           | `https://mapzen.com/carto/cinnabar-style/cinnabar-style.yaml`                          |
| `L.Mapzen.BasemapStyles.CinnabarMoreLabels` | `https://mapzen.com/carto/cinnabar-style-more-labels/cinnabar-style-more-labels.yaml`  |
| `L.Mapzen.BasemapStyles.CinnabarNoLabels`   | `https://mapzen.com/carto/cinnabar-style-no-labels/cinnabar-style-no-labels.yaml`      |
| `L.Mapzen.BasemapStyles.Refill`             | `https://mapzen.com/carto/refill-style/refill-style.yaml`                              |
| `L.Mapzen.BasemapStyles.RefillMoreLabels`   | `https://mapzen.com/carto/refill-style-more-labels/refill-style-more-labels.yaml`      |
| `L.Mapzen.BasemapStyles.RefillNoLabels`     | `https://mapzen.com/carto/refill-style-no-labels/refill-style-no-labels.yaml`          |
| `L.Mapzen.BasemapStyles.Zinc`               | `https://mapzen.com/carto/zinc-style/zinc-style.yaml`                                  |
| `L.Mapzen.BasemapStyles.ZincMoreLabels`     | `https://mapzen.com/carto/zinc-style-more-labels/zinc-style-more-labels.yaml`          |
| `L.Mapzen.BasemapStyles.ZincNoLabels`       | `https://mapzen.com/carto/zinc-style-no-labels/zinc-style-no-labels.yaml`              |
| `L.Mapzen.BasemapStyles.Walkabout` | `https://mapzen.com/carto/walkabout-style/walkabout-style.yaml` |
| `L.Mapzen.BasemapStyles.WalkaboutMoreLabels` | `https://mapzen.com/carto/walkabout-style-more-labels/walkabout-style-more-labels.yaml` |
| `L.Mapzen.BasemapStyles.WalkaboutNoLabels` | `https://mapzen.com/carto/walkabout-style-no-labels/walkabout-style-no-labels.yaml` |
| `L.Mapzen.BasemapStyles.Tron`| `https://mapzen.com/carto/tron-style/tron-style.zip`                                                  |
| `L.Mapzen.BasemapStyles.TronMoreLabels`| `https://mapzen.com/carto/tron-style-more-labels/tron-style-more-labels.zip`                |
| `L.Mapzen.BasemapStyles.TronNoLabels`| `https://mapzen.com/carto/tron-style-no-labels/tron-style-no-labels.zip`                      |


_Note: L.Mapzen.HouseStyles has been deprecated for L.Mapzen.BasemapStyles. Starting with mapzen.js 1.0, you must use only L.Mapzen.BasemapStyles._

## Geocoder control

`L.Mapzen.geocoder` adds a Mapzen Search box to the map. Create a [Mapzen API key](https://mapzen.com/developers) to use the geocoder.

```javascript
var geocoder = L.Mapzen.geocoder('mapzen-api-key');
geocoder.addTo(map);
```

The geocoder has many options. See the [geocoder API reference](search.md) for more information.

## Bug (“Scarab”) Control

`L.Mapzen.bug` implements a small header for Mapzen demos, with the company logo and social media links. It provides Mapzen attribution, link to the Mapzen website, and provides a way for viewers to share the map. It is mostly intended for Mapzen internal use.

The term bug is borrowed from broadcast television (officially, ["digital on-screen graphic"](http://en.wikipedia.org/wiki/Digital_on-screen_graphic)) where a show is branded in the lower corner to identify the broadcast network.

```javascript
L.Mapzen.bug({
  name: 'Web Map',
  link: 'https://erasermap.com/maps',
  tweet: '@mapzen',
  repo: 'https://github.com/mapzen/web-map'
});
```

Bug Options

| Option  | Type   | Default                        | Description                            |
|---------|--------|--------------------------------|----------------------------------------|
| `name`  | String | `'Web Map'`                    | Name of this map.                      |
| `link`  | String | `'https://erasermap.com/maps'` | Permalink to this map.                 |
| `tweet` | String | `'{name}, powered by @mapzen'` | Default tweet text for Twitter button. |
| `repo`  | String | `'https://github.com/mapzen/'` | GitHub link for map source code.       |

## Locator control

`L.Mapzen.locator` adds a geolocation control to the map. This integrates the [Leaflet.Locator control](https://github.com/domoritz/leaflet-locatecontrol); see that project's [documentation](https://github.com/domoritz/leaflet-locatecontrol/blob/gh-pages/README.md) for additional options.

``` javascript
var locator = L.Mapzen.locator();
locator.setPosition('bottomright');
locator.addTo(map);
```

## Hash control

`L.Mapzen.hash` adds a URL hash to a map, so you can link to map location and state. The Hash function accepts components whose state can be linked.

```javascript
L.Mapzen.hash({
  map: map
})
```

Hash Options

| Option     | Type              | Default | Description           |
|------------|-------------------|---------|-----------------------|
| `map`      | L.Mapzen.map      | `null`  | Instance of map.      |
| `geocoder` | L.Mapzen.geocoder | `null`  | Instance of geocoder. |

## Events

All of Leaflet's event methods are available, such as `on`, `off`, `once`, and so on. In addition, mapzen.js provides these events.

|      Event      |                   Description                   |
|-----------------|-------------------------------------------------|
| `tangramloaded` | Fired when a Tangram layer is loaded in the map |
