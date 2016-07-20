MapzenJS
====

Mapzen.js acts as a focal point for ad hoc demo needs throughout Mapzen.

You can use MapzenJS through cdn.

```
<!-- style sheet for mapzen.js -->
<link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">

<!-- latest version of mapzen.js-->
<script src="https://mapzen.com/js/mapzen.js"></script>

<!-- latest minified version of mapzen.js -->
<script src="https://mapzen.com/js/mapzen.min.js"></script>
```

### Leaflet Plugin
MapzenJS is written as an extension of [Leaflet](http://leafletjs.com/), which means you have full access to the Leaflet API through MapzenJS. More details are in the API section.

Getting Started
----

The HTML below represents the minimum structure to display the map centered on NYC with [bubble-wrap](https://github.com/tangrams/bubble-wrap) style.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <!-- Link to mapzen.js script and stylesheets: -->
    <link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">
    <style>
      html, body {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
      }
      #map {
        width: 100%;
        height: 100%;
      }
    </style>
    <script src="https://mapzen.com/js/mapzen.min.js"></script>
    <style lang="text/css">
      /* Fill the entire page with a map: */
      html, body { margin: 0; padding: 0 }
      html, body, #map { width: 100%; height: 100%;}
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      // Add a map to the #map DIV, and center it on New York:
      var map = L.Mapzen.map('map');
      // Set default view on New York at zoom level 13
      map.setView([40.70531, -74.009], 13);
    </script>
  </body>
</html>
```

API
---

### Map

`L.Mapzen.map` extends [Leaflet `L.Map`](http://leafletjs.com/reference.html#map-class) with additional options. You can pass Mapzen House styles as `scene` inside of options, or you can have your own scene file path for Tangram. Otherwise, the default scene is the [Bubble Wrap](https://mapzen.com/blog/bubble-wrap-carto/) style. 

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

`L.Mapzen.geocoder` adds a Mapzen Search component to the map. [Create a Mapzen Search API key](https://mapzen.com/developers) to use the geocoder. Its default behaviour is customized to be easily used in demo. You can check more options for Mapzen Leaflet Geocoder on [its page](https://github.com/mapzen/leaflet-geocoder).

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

`L.Mapzen.hash` adds a URL hash to a map, so that the user can link to map location and state. The hash function accepts components whose state can be linked.

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

Mapzen.JS has constants for House Styles under `L.Mapzen.HouseStyles` namespace for easy access. A usage of `L.Mapzen.HouseStyles` is passing it as 'scene' option for `L.Mapzen.map` instance.

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


Open Source 💕
----

MapzenJS is made from awesome open source projects:

- [Leaflet](http://leafletjs.com/)
- [Leaflet Locate Control](https://github.com/domoritz/leaflet-locatecontrol)
- [Mapzen Bug](https://github.com/mapzen/scarab/tree/master/src/components/bug)
- [Mapzen Leaflet Geocoder](https://github.com/mapzen/leaflet-geocoder)

[Build MapzenJS locally using `npm`](BUILD.md).
