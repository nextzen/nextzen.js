# Mapzen.js

Mapzen.js is an open-source JavaScript SDK and an extension of [Leaflet](http://leafletjs.com/) for making maps for the web and mobile devices. Mapzen.js simplifies the process of using Mapzen's maps within Leaflet.

Mapzen.js contains all the Leaflet functionality, as well as additional tools for working with Mapzen maps and search. With Mapzen.js you can add [Mapzen map styles](https://mapzen.com/products/maps/) as a basemap, build a customizable geocoder with [Mapzen Search](https://mapzen.com/products/search/), and create fragment URLs to be able to share the exact map instance with someone.

## Mapzen.js documentation

You can find tutorials and a full API reference at https://mapzen.com/documentation/mapzen-js/.

The source files for the documentation are in the [/docs] folder(https://github.com/mapzen/mapzen.js/tree/master/docs) of this repository.

## Add Mapzen.js to your page

To reference the Mapzen.js cascading style sheet (CSS) and JavaScript file, add these links to your page.

```html
<!-- style sheet for mapzen.js -->
<link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">

<!-- latest version of mapzen.js-->
<script src="https://mapzen.com/js/mapzen.js"></script>

<!-- latest minified version of mapzen.js -->
<script src="https://mapzen.com/js/mapzen.min.js"></script>
```

You can use [npm](BUILD.md) if you want to build locally.

## Component open-source projects 💕

Mapzen.js includes components from these awesome open-source projects:

- [Leaflet](http://leafletjs.com/)
- [Leaflet.Locate control](https://github.com/domoritz/leaflet-locatecontrol)
- [Mapzen Scarab social media control](https://github.com/mapzen/scarab/tree/master/src/components/bug)
- [Mapzen Leaflet geocoder plug-in](https://github.com/mapzen/leaflet-geocoder)
