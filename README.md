[![npm](https://img.shields.io/npm/v/mapzen.js.svg)](https://www.npmjs.com/package/mapzen.js)
[![CircleCI](https://img.shields.io/circleci/project/github/mapzen/mapzen.js.svg)](https://circleci.com/gh/mapzen/mapzen.js)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=d01tT2tKVHBtbHNnM1FHM1hPMXR1TnRIbERNcEV3OGxicDVRZk5McU14ND0tLW1vN0Z5a2l2UlJieHBVdnhwRDcxdHc9PQ==--de93b040140c8fa6f79999d958b2a06912c385b1%)](https://www.browserstack.com/automate/public-build/d01tT2tKVHBtbHNnM1FHM1hPMXR1TnRIbERNcEV3OGxicDVRZk5McU14ND0tLW1vN0Z5a2l2UlJieHBVdnhwRDcxdHc9PQ==--de93b040140c8fa6f79999d958b2a06912c385b1%)
# mapzen.js

mapzen.js is an open-source JavaScript SDK and an extension of [Leaflet](http://leafletjs.com/) for making maps for the web and mobile devices. mapzen.js simplifies the process of using Mapzen's maps within Leaflet.

mapzen.js builds upon Leaflet's functionality by providing tools for working with Mapzen maps and search. With mapzen.js you can add [Mapzen map styles](https://mapzen.com/products/maps/) as basemaps, build a customizable geocoder with [Mapzen Search](https://mapzen.com/products/search/), and share links to maps.

**The current version of mapzen.js embeds Leaflet v1.0.1.** If you need to use another version of Leaflet, please take a look at the [standalone build](#builds) below.


## Demos

- [Eraser map](https://erasermap.com/map/)
- [One Minute Map](https://mapzen.com/blog/one-minute-map/) (blog post and demo)
- [Mapzen Turn by Turn demo (loading dynamic data)](http://mapzen.github.io/lrm-mapzen/tangram-route.html)

## Basic Usage

Set up a basic [Leaflet](http://leafletjs.com/) map with the default [Mapzen basemap](https://mapzen.com/documentation/cartography/styles/) in three steps.

**Step 1:**  In the `<head>` of your HTML page, import the mapzen.js JavaScript and CSS files:

 ```html
<!-- style sheet for mapzen.js -->
<link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">

<!-- latest minified version of mapzen.js -->
<script src="https://mapzen.com/js/mapzen.min.js"></script>
 ```

And add a height and width for the map:

```html
<style>
  #map {
    height: 300px;
    width: 600px;
  }
</style>
```

**Step 2:** In the `<body>` of your HTML page, add a "map" div:

```html
<div id="map"></div>
```


**Step 3:** At the bottom of your page, add a JavaScript section to set up the map:

```html
<script>
  // Add a Mapzen API key
  // To generate your key, go to https://mapzen.com/developers/
  L.Mapzen.apiKey = 'your-mapzen-api-key';

  // Add a map to the 'map' div
  var map = L.Mapzen.map('map');

  // Set the center of the map to be the San Francisco Bay Area at zoom level 12
  map.setView([37.7749, -122.4194], 12);
</script>
```

_Tip: Don't forget to generate your API key at https://mapzen.com/developers/_


**Done!**

See the full tutorial: [Get started with mapzen.js](https://mapzen.com/documentation/mapzen-js/get-started/)

## Documentation

Read the full API documentation at https://mapzen.com/documentation/mapzen-js/.

The source files for the documentation are located in the [/docs](https://github.com/mapzen/mapzen.js/tree/master/docs) folder of this repository.


## Releases

The most recent mapzen.js release relies on [Leaflet v1.0.1](http://leafletjs.com/reference-1.0.0.html) and [Tangram v0.13](https://github.com/tangrams/tangram).

Previous mapzen.js releases can be imported by referencing the specific version number:

```html
<script src="https://mapzen.com/js/0.5.0/mapzen.min.js"></script>
```

[See the full list of releases and release notes here](https://github.com/mapzen/mapzen.js/releases).

## Builds

There are a few different mapzen.js builds to meet specific needs:

**Minified:**  Use the minified build for most use cases.

```html
<script src="https://mapzen.com/js/mapzen.min.js"></script>
```

**Debugging:**  Use the unminified version for help with debugging.

```html
<script src="https://mapzen.com/js/mapzen.js"></script>
```

If you want to load the unminified version of [Tangram.js](https://github.com/tangrams/tangram), as well, use the [`debugTangram`](https://mapzen.com/documentation/mapzen-js/api-reference/#options) option when initializing the map.

**Standalone:** Use the standalone version if you want to use a different version of Leaflet.  Currently, mapzen.js supports Leaflet v.0.7.x and v1.0.x. (Other versions of Leaflet may work, but are not actively tested or supported.)

The standalone build includes a standalone css file, as well.

```html
<!-- style sheet for mapzen.js -->
<link rel="stylesheet" href="https://mapzen.com/js/mapzen.standalone.css">

<!-- latest version of stasndalone mapzen.js-->
<script src="https://mapzen.com/js/mapzen.standalone.js"></script>

<!-- latest minified version of standalone mapzen.js -->
<script src="https://mapzen.com/js/mapzen.standalone.min.js"></script>
```

See [BUILD.md](BUILD.md) if you want to build locally (requires [npm](https://www.npmjs.com)).

## Import as module

mapzen.js can be imported as a module using [npm](https://www.npmjs.com):

```
npm install mapzen.js
```

## Component open-source projects 💕

mapzen.js includes components from these awesome open-source projects:

- [Leaflet](http://leafletjs.com/)
- [Leaflet.Locate control](https://github.com/domoritz/leaflet-locatecontrol)
- [Mapzen Scarab social media control](https://github.com/mapzen/scarab)
- [Mapzen Leaflet geocoder plug-in](https://github.com/mapzen/leaflet-geocoder)


