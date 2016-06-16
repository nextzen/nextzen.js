## MapzenJS

### Leaflet Plugin
Mapzen JS is written as an extension of [Leaflet](http://leafletjs.com/), which means you have full access to Leaflet API through MapzenJS.

### Getting Started

Mapzen.js is available via the url below.
`https://mapzen.com/js/0.0.0/mapzen.js`
`https://mapzen.com/js/0.0.0/mapzen.min.js`
`https://mapzen.com/js/0.0.0/mapzen.css`

The HTML below represents the minimum structure to display the map centered on NYC with [bubble-wrap](https://github.com/tangrams/bubble-wrap) style.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" href="https://mapzen.com/js/0.0.0/mapzen.css">
  </head>
  <body>
    <div id="map"></div>
    <script src="https://mapzen.com/js/0.0.0/mapzen.min.js"></script>
    <script>
      var map = L.Mapzen.map('map', {
        scene: 'bubble-wrap'
      });
      // Set first view as NYC
      map.setView([-74.009,40.70531], 13);
    </script>
  </body>
</html>
```
### Build Locally

MapzenJS uses [npm]((https://docs.npmjs.com/getting-started/installing-node)) for its building process.

```
npm install
```
The comand above will install depandancies for develpments.

```
npm build
```
This command bundles the javascript source files in `src` folder to `mapzen.js` , compiles scss files to css. The command also copies the `index.html` inside of `src` foler to `dist`, so result can be run easily in `dist` folder.

If you are planning to actively changing the code, the commands below would help.
```
npm run dev
```

This command watches javascript source files and spits out the compiled script whenever there is change.
```
npm run build-dev-style
```
This command watches scss files and compiles them to the css whenever change happens in the source files.



### :two_hearts:

This is the list of the great projects composing MapzenJS.

- [Leaflet](http://leafletjs.com/)
- [Leaflet Locatle Control](https://github.com/domoritz/leaflet-locatecontrol)
- [Mapzen Leaflet Geocoder](https://github.com/mapzen/leaflet-geocoder)
- [Mapzen Bug](https://github.com/mapzen/scarab/tree/master/src/components/bug)