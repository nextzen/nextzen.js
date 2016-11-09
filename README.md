[![npm](https://img.shields.io/npm/v/mapzen.js.svg)](https://www.npmjs.com/package/mapzen.js)
[![CircleCI](https://img.shields.io/circleci/project/github/mapzen/mapzen.js.svg)](https://circleci.com/gh/mapzen/mapzen.js)

# mapzen.js

mapzen.js is an open-source JavaScript SDK and an extension of [Leaflet](http://leafletjs.com/) for making maps for the web and mobile devices. mapzen.js simplifies the process of using Mapzen's maps within Leaflet.

mapzen.js builds upon Leaflet's functionality by providing tools for working with Mapzen maps and search. With mapzen.js you can add [Mapzen map styles](https://mapzen.com/products/maps/) as basemaps, build a customizable geocoder with [Mapzen Search](https://mapzen.com/products/search/), and share links to maps.

** Current M


## Demo

[add link(s) here]

## Basic Usage

Set up a basic [Leaflet](http://leafletjs.com/) map with the default [Mapzen basemap](https://mapzen.com/documentation/cartography/styles/) in three steps.

**Step 1:**  In the `<head>` of your HTML page, import the mapzen.js JavaScript and CSS files:

 ```html
<!-- style sheet for mapzen.js -->
<link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">

<!-- latest minified version of mapzen.js -->
<script src="https://mapzen.com/js/mapzen.min.js"></script>
 ```

**Step 2:** In the `<body>` of your HTML page, add a "map" div:

```html
<div id="map"></div>
```


**Step 3:** At the bottom of your page, add a JavaScript section to set up the map:

```js
<script>
  // Add a map to the 'map' div
  var map = L.Mapzen.map('map');

  // Set the center of the map to be the San Francisco Bay Area at zoom level 12
  map.setView([37.7749, -122.4194], 12);
</script>
```

**Done!**

See the full tutorial at [Get started with mapzen.js](https://mapzen.com/documentation/mapzen-js/get-started/).

## Documentation

Read the full API documentation at https://mapzen.com/documentation/mapzen-js/.

The source files for the documentation are in the [/docs](https://github.com/mapzen/mapzen.js/tree/master/docs) folder of this repository.


## Releases

**The most recent mapzen.js release is v.0.5.1,** which relies on [Leaflet v1.0.1](http://leafletjs.com/reference-1.0.0.html) and Tangram v0.10. [See the full list of releases and release notes here](https://github.com/mapzen/mapzen.js/releases).

Previous mapzen.js releases can be imported by referencing the specific version number:

```
<script src="https://mapzen.com/js/0.5.0/mapzen.min.js"></script>
```


## Builds

There are several different mapzen.js builds to meet specific needs:

**Minified:**  Use the minified build for most use cases.

```
<script src="https://mapzen.com/js/mapzen.min.js"></script>
```

**Debugging:**
mapzen.js uses [Tangram.js](https://github.com/tangrams/tangram) Use the unminified version for help with debugging. To load uniminified version of Tangram, use [`debugTangram`](https://mapzen.com/documentation/mapzen-js/api-reference/#options) option when initializing a map.

```
<script src="https://mapzen.com/js/mapzen.js"></script>
```

**Standalone:** Use the standalone version if you want to use a different version of Leaflet.  mapzen.js supports Leaflet v.0.7.x and v1.0.0. (Other versions of Leaflet may work, but are not actively tested or supported.)  This build includes a standalone css file, as well.

```
<!-- style sheet for mapzen.js -->
<link rel="stylesheet" href="https://mapzen.com/js/mapzen.standalone.css">

<!-- latest version of stasndalone mapzen.js-->
<script src="https://mapzen.com/js/mapzen.standalone.js"></script>

<!-- latest minified version of standalone mapzen.js -->
<script src="https://mapzen.com/js/mapzen.standalone.min.js"></script>
```


See the [npm build doc](BUILD.md) if you want to build locally.

## Import as module

mapzen.js can be imported as a module using [npm](https://www.npmjs.com):

```
npm install mapzen.js
```

## Component open-source projects 💕

mapzen.js includes components from these awesome open-source projects:

- [Leaflet](http://leafletjs.com/)
- [Leaflet.Locate control](https://github.com/domoritz/leaflet-locatecontrol)
- [Mapzen Scarab social media control](https://github.com/mapzen/scarab/tree/master/src/components/bug)
- [Mapzen Leaflet geocoder plug-in](https://github.com/mapzen/leaflet-geocoder)


