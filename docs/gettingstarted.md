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
      html, body, #map { width: 100%; height: 100% }
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
