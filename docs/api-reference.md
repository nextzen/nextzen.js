# API reference

Mapzen.js is an open-source web API and an extension of [Leaflet](http://leafletjs.com/). This API offers the full extent of the Leaflet library with additional functions to make using Mapzen tools as simple as possible. With Mapzen.js you can add [Mapzen House Styles]() as a basemap, build a customizable geocoder with [Mapzen Search](https://mapzen.com/products/search/), and can create fragment URLs to be able to share the exact map instance with someone.

### Map

`L.Mapzen.map` extends [Leaflet `L.Map`](http://leafletjs.com/reference.html#map-class) with additional options. You can pass Mapzen House styles as `scene` inside of options, or you can have your own scene file path for Tangram. Whene there is no scene file declared, You would need to set your own tile to display the map.

```javascript
var map = L.Mapzen.map('map', {
  center: [40.74429, -73.99035],
  zoom: 15,
  scene: L.Mapzen.HouseStyles.Refill
})
```

Map Options

| Option  | Type   | Default                           | Description                                                   |
|---------|--------|-----------------------------------|---------------------------------------------------------------|
| `scene` | String | `L.Mapzen.HouseStyles.BubbleWrap` | Tangram scene URL, included in `L.Mapzen.HouseStyles` object. <br> `scene` can also be a single-quoted URL that points to any `.yaml` Tangram scene file |
| `fallBackTile` | [L.TileLayer](http://leafletjs.com/reference.html#tilelayer) | `L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {})` | Tilelayer to fall back when WebGL is not available. |
| `attributionText` | String | `<a href="https://mapzen.com">Mapzen</a> - <a href="https://www.mapzen.com/rights">Attribution</a>, Data ©<a href="https://openstreetmap.org/copyright">OSM</a> contributors` | Attribution data  in a small text box.`Leaflet` attribution is always there, attribution from this option is placed before `Leaflet` attribution.|

### Geocoder Control

`L.Mapzen.geocoder` adds a Mapzen Geocoder component to the map. [Create a Mapzen Search API key](https://mapzen.com/developers) to use the geocoder. Its default behaviour is customized to be easily used in demo. You can check more options for Mapzen Leaflet Geocoder on [its page](https://github.com/mapzen/leaflet-geocoder).

```javascript
var geocoder = L.Mapzen.geocoder('search-api-key');
geocoder.addTo(map);
```

| Option  | Type   | Default | Description                      |
|---------|--------|---------|----------------------------------|
| `collapsible` | boolean | `true`  | Search component automatically adjusting collapsing behaviour. |
| `expanded` | boolean | `true`  | Search component does not collapse into a button-only state. |

### Bug (“Scarab”) Control

`L.Mapzen.bug` implements a small header for Mapzen demos, with the company logo and social media links.

```javascript
L.Mapzen.bug({
  name: 'Web Map',
  link: 'https://erasermap.com/maps',
  tweet: '@mapzen',
  repo: 'https://github.com/mapzen/web-map'
});
bug.addTo(map);
```

Bug Options

| Option  | Type   | Default                        | Description                            |
|---------|--------|--------------------------------|----------------------------------------|
| `name`  | String | `'Web Map'`                    | Name of this map.                      |
| `link`  | String | `'https://erasermap.com/maps'` | Permalink to this map.                 |
| `tweet` | String | `'{name}, powered by @mapzen'` | Default tweet text for Twitter button. |
| `repo`  | String | `'https://github.com/mapzen/'` | Github link for map source code.       |

### Locator Control

`L.Mapzen.locator` adds a geolocation control to the map.

``` javascript
var locator = L.Mapzen.locator();
locator.setPosition('bottomright');
locator.addTo(map);
```

### Hash Control

`L.Mapzen.hash` adds a URL hash to a map, so that the user can link to map location and state. The Hash function accepts components whose state can be linked.

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

### House Styles

Mapzen.JS has constants for [House Style]() basemaps under `L.Mapzen.HouseStyles` namspace to make it easy to access to them. One usage of `L.Mapzen.HouseStyles` is passing it as 'scene' option for `L.Mapzen.map` instance.

```
var map = L.Mapzen.map('map', {
  scene: L.Mapzen.HouseStyles.Refill
})
```

| Constant                                  | Value                                                                                  |
|-------------------------------------------|----------------------------------------------------------------------------------------|
| `L.Mapzen.HouseStyles.BubbleWrap`         | `https://mapzen.com/carto/bubble-wrap-style/bubble-wrap.yaml`                          |
| `L.Mapzen.HouseStyles.Cinnabar`           | `https://mapzen.com/carto/cinnabar-style/cinnabar-style.yaml`                          |
| `L.Mapzen.HouseStyles.CinnabarMoreLabels` | `https://mapzen.com/carto/cinnabar-style-more-labels/cinnabar-style-more-labels.yaml`  |
| `L.Mapzen.HouseStyles.CinnabarNoLabels`   | `https://mapzen.com/carto/cinnabar-style-no-labels/cinnabar-style-no-labels.yaml`      |
| `L.Mapzen.HouseStyles.Refill`             | `https://mapzen.com/carto/refill-style/refill-style.yaml`                              |
| `L.Mapzen.HouseStyles.RefillMoreLabels`   | `https://mapzen.com/carto/refill-style-more-labels/refill-style-more-labels.yaml`      |
| `L.Mapzen.HouseStyles.RefillNoLabels`     | `https://mapzen.com/carto/refill-style-no-labels/refill-style-no-labels.yaml`          |
| `L.Mapzen.HouseStyles.Zinc`               | `https://mapzen.com/carto/zinc-style/zinc-style.yaml`                                  |
| `L.Mapzen.HouseStyles.ZincMoreLabels`     | `https://mapzen.com/carto/zinc-style-more-labels/zinc-style-more-labels.yaml`          |
| `L.Mapzen.HouseStyles.ZincNoLabels`       | `https://mapzen.com/carto/zinc-style-no-labels/zinc-style-no-labels.yaml`              |
