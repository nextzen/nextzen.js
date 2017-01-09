# API reference

mapzen.js is an open-source JavaScript SDK and an extension of [Leaflet](http://leafletjs.com/) for making maps for the web and mobile devices. mapzen.js simplifies the process of using Mapzen's maps within Leaflet.

## Map

`L.Mapzen.map` extends [Leaflet `L.Map`](http://leafletjs.com/reference.html#map-class) with additional options.

### Options

| Option  | Type   | Default   | Description            |
|---------|--------|-----------|------------------------|
| `apiKey`| String | null | Mapzen API Key to be used for the components attached to the map.|
| `attribution` | String | `<a href="https://mapzen.com">Mapzen</a> - <a href="https://www.mapzen.com/rights">Attribution</a>, Data ©<a href="https://openstreetmap.org/copyright">OSM</a> contributors` | Attribution data in a small text box. `Leaflet` attribution is always there; attribution from this option is placed before `Leaflet` attribution.|
| `debugTangram`| Boolean | `false` | Whether to load the debug (non-minified) version of Tangram or not. <br>**Deprecated; will be removed in v1.0. See [tangramOptions](#tangramoptions) below.** |
| `fallbackTile` | [L.TileLayer](http://leafletjs.com/reference.html#tilelayer) | `L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {})` | TileLayer to fall back when WebGL is not available. |
| `scene` | String | `L.Mapzen.BasemapStyles.BubbleWrap` | Tangram scene URL, included in `L.Mapzen.BasemapStyles` object. <br> `scene` can also be a single-quoted URL that points to any `.yaml` Tangram scene file<br>**Deprecated; will be removed in v1.0. See [tangramOptions](#tangramoptions) below.** |
| `tangramOptions`| Object |  _See below_ |  See [tangramOptions](#tangramoptions) below |

#### tangramOptions

Set of options related to the appearance and behavior of the Tangram layer.  In addition to the options below, `tangramOptions` may also include any of the options available in the [Tangram options object](https://mapzen.com/documentation/tangram/Tangram-Overview/#options-object).

| Option  | Type   | Default   | Description            |
|---------|--------|-----------|------------------------|
| `debug` | Boolean | `false` | Whether to load the debug (non-minified) version of Tangram or not.|
| `scene` | String | `L.Mapzen.BasemapStyles.BubbleWrap` | Tangram scene URL, included in `L.Mapzen.BasemapStyles` object. <br> `scene` can also be a single-quoted URL that points to any `.yaml` Tangram scene file |

Example:

```javascript
var map = L.Mapzen.map('map', {
  tangramOptions: {
    debug: true,
    scene: 'my-scene-file.yaml'
  }
});
```

### Events

All of [Leaflet's event methods](http://leafletjs.com/reference-1.0.2.html#map-event) are available, such as `on`, `off`, or `once`. In addition, mapzen.js provides these events:

| Event  | Description                                                  |
|--------|--------------------------------------------------------------|
| `tangramloaded` | Fired when a Tangram layer is loaded in the map. This event allows user to access to TangramLayer through `event.tangramLayer`|

For access to Tangram’s [scene object](https://mapzen.com/documentation/tangram/Javascript-API/#scene) or [config object](https://mapzen.com/documentation/tangram/Javascript-API/#config) (interfaces for controlling your Tangram scene at runtime), listen for the `tangramloaded` event on the map. It is available as a property of the Tangram Leaflet layer, which you will find in the event property `tangramLayer`.

Example of how to use the `tangramloaded` event to access Tangram's `scene` object:

```javascript
map.on('tangramloaded', function (event) {
  var scene = event.tangramLayer.scene;
});
```

### Draw a map with a map component

You can pass one of [Mapzen's basemap styles](https://mapzen.com/documentation/mapzen-js/api-reference/#basemap-styles) as the `scene` via `tangramOptions`, or you can provide the path to your own Tangram scene file.  If there is no scene file declared, mapzen.js will default to [BubbleWrap](https://mapzen.com/products/maps/bubble-wrap/).

Example: 

```javascript
var map = L.Mapzen.map('map', {
  center: [40.74429, -73.99035],
  zoom: 15,
  tangramOptions: {
    scene: L.Mapzen.BasemapStyles.Refill
  }
});
```

The `center` parameter sets the center point of the map (_[latitude, longitude]_), in decimal degrees. The next line sets the `zoom` level, which is like a map scale or resolution. A small zoom level will show a larger area in less detail, and a larger zoom level value depicts smaller area in greater detail.

The `scene: L.Mapzen.BasemapStyles.Refill` line sets the style used for the map. In this case, it is Mapzen's [Refill](https://mapzen.com/products/maps/refill/) style, which provides a high contrast, black & white basemap useful for data visualization.

## API Key

If you are planning to use the [Mapzen Search](https://mapzen.com/products/search/) or [Turn-by-Turn](https://mapzen.com/products/turn-by-turn/) service through mapzen.js, you can set up an API key to use once through `L.Mapzen.apikey`.

Define your API key before adding other Mapzen components by setting:

```javascript
L.Mapzen.apiKey = 'your-api-key';
```

Get your free API key through the **[Mapzen developer portal](https://mapzen.com/developers)**.

## Basemap styles

mapzen.js provides a set of constants for easier access to Mapzen's [basemap styles](https://mapzen.com/products/maps/). These are available under the `L.Mapzen.BasemapStyles` namespace. 

| Constant             | Value                                                                                  |
|----------------------|----------------------------------------------------------------------------------------|
| `BubbleWrap`         | `https://mapzen.com/carto/bubble-wrap-style/bubble-wrap.yaml`                          |
| `Cinnabar`           | `https://mapzen.com/carto/cinnabar-style/cinnabar-style.yaml`                          |
| `CinnabarMoreLabels` | `https://mapzen.com/carto/cinnabar-style-more-labels/cinnabar-style-more-labels.yaml`  |
| `CinnabarNoLabels`   | `https://mapzen.com/carto/cinnabar-style-no-labels/cinnabar-style-no-labels.yaml`      |
| `Refill`             | `https://mapzen.com/carto/refill-style/refill-style.yaml`                              |
| `RefillMoreLabels`   | `https://mapzen.com/carto/refill-style-more-labels/refill-style-more-labels.yaml`      |
| `RefillNoLabels`     | `https://mapzen.com/carto/refill-style-no-labels/refill-style-no-labels.yaml`          |
| `Zinc`               | `https://mapzen.com/carto/zinc-style/zinc-style.yaml`                                  |
| `ZincMoreLabels`     | `https://mapzen.com/carto/zinc-style-more-labels/zinc-style-more-labels.yaml`          |
| `ZincNoLabels`       | `https://mapzen.com/carto/zinc-style-no-labels/zinc-style-no-labels.yaml`              |
| `Walkabout` | `https://mapzen.com/carto/walkabout-style/walkabout-style.yaml` |
| `WalkaboutMoreLabels` | `https://mapzen.com/carto/walkabout-style-more-labels/walkabout-style-more-labels.yaml` |
| `WalkaboutNoLabels` | `https://mapzen.com/carto/walkabout-style-no-labels/walkabout-style-no-labels.yaml` |
| `Tron`| `https://mapzen.com/carto/tron-style/tron-style.zip`                                                  |
| `TronMoreLabels`| `https://mapzen.com/carto/tron-style-more-labels/tron-style-more-labels.zip`                |
| `TronNoLabels`| `https://mapzen.com/carto/tron-style-no-labels/tron-style-no-labels.zip`                      |

Example: 

```javascript
var map = L.Mapzen.map('map', {
  tangramOptions: {
    scene: L.Mapzen.BasemapStyles.Refill
  }
})
```

Learn more about Mapzen basemaps and options for customization in Mapzen's [Cartography documentation](https://mapzen.com/documentation/cartography/).

_Note: `L.Mapzen.HouseStyles` has been deprecated for `L.Mapzen.BasemapStyles`. Starting with mapzen.js 1.0, you must use only `L.Mapzen.BasemapStyles`._

## Geocoder control

Add a [Mapzen Search](https://mapzen.com/products/search/) box (a.k.a. _geocoder_) to your map to allow your map users to quickly jump to anywhere in the world.

Example:

```javascript
var geocoder = L.Mapzen.geocoder('mapzen-api-key');
geocoder.addTo(map);
```

The geocoder has [many options](search.md/#options) for customization. See the [Geocoder API Reference](search.md) for more information.

_Note: Mapzen Search requires an API key. **Get your free API key through the [Mapzen developer portal](https://mapzen.com/developers).**_

## Bug ("Scarab") Control

`L.Mapzen.bug` implements a small header for Mapzen demos, with the company logo and social media links. It provides Mapzen attribution, a link to the Mapzen website, and provides a way for viewers to share the map. It is mostly intended for Mapzen internal use.

The term _bug_ is borrowed from broadcast television (officially, ["digital on-screen graphic"](http://en.wikipedia.org/wiki/Digital_on-screen_graphic)) where a show is branded in the lower corner to identify the broadcast network.

Example: 

```javascript
L.Mapzen.bug({
  name: 'Web Map',
  link: 'https://erasermap.com/maps',
  tweet: '@mapzen',
  repo: 'https://github.com/mapzen/web-map'
});
```

### Options

| Option  | Type   | Default                        | Description                            |
|---------|--------|--------------------------------|----------------------------------------|
| `name`  | String | `'Web Map'`                    | Name of this map.                      |
| `link`  | String | `'https://erasermap.com/maps'` | Permalink to this map.                 |
| `tweet` | String | `'{name}, powered by @mapzen'` | Default tweet text for Twitter button. |
| `repo`  | String | `'https://github.com/mapzen/'` | GitHub link for map source code.       |

## Locator control

`L.Mapzen.locator` adds a geolocation control to the map. This integrates the [Leaflet.Locate control](https://github.com/domoritz/leaflet-locatecontrol). See the [Leaflet.Locate documentation](https://github.com/domoritz/leaflet-locatecontrol/blob/gh-pages/README.md) for additional options.

Example: 

``` javascript
var locator = L.Mapzen.locator();
locator.setPosition('bottomright');
locator.addTo(map);
```

## Hash control

`L.Mapzen.hash` adds a URL hash to a map, so you can link to map location and state. The Hash function accepts components whose state can be linked.

Example: 

```javascript
L.Mapzen.hash({
  map: map
})
```

### Options

| Option     | Type              | Default | Description           |
|------------|-------------------|---------|-----------------------|
| `map`      | L.Mapzen.map      | `null`  | Instance of map.      |
| `geocoder` | L.Mapzen.geocoder | `null`  | Instance of geocoder. |
