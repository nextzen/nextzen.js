## MapzenJS

### Leaflet Plugin
Mapzen JS is written as an extension of [Leaflet](http://leafletjs.com/), which means you have full access to Leaflet API through MapzenJS. You can check more details at [API](#API) section.

### Getting Started

Mapzen.js is available via the url below.
```
https://mapzen.com/js/0.0.0/mapzen.js
```
```
https://mapzen.com/js/0.0.0/mapzen.min.js
```
```
https://mapzen.com/js/0.0.0/mapzen.css
```

The HTML below represents the minimum structure to display the map centered on NYC with [bubble-wrap](https://github.com/tangrams/bubble-wrap) style.

```html
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
      // Set the first view as NYC
      map.setView([-74.009,40.70531], 13);
    </script>
  </body>
</html>
```

### API

- `L.Mapzen.map`

extends Leaflet's `L.Map` with additional options. You can pass Mapzen House styles as `scene` inside of options, or you can have your own scene file path for Tangram. Whene there is no scene file declared, You would need to set your own tile to display the map.

```javascript
var map = L.Mapzen.map('map',{
  scene: 'refill'
})
```

- `L.Mapzen.geocoder`

puts Mapzen Geocoder compoenent to the map. You need to [make API key](https://mapzen.com/developers) for Mapzen Search to use this. Its default behaviour is customized to be easily used in demo. You can check more options for Mapzen Leaflet Geocoder on [its page](https://github.com/mapzen/leaflet-geocoder).

```javascript
var geocoder = L.Mapzen.geocoder('search--NA8UXg');
geocoder.addTo(map);
```

- `L.Mapzen.bug`

is mainly for full-size demo to brand it with Mapzen lgoo and social media links. You can pass options for `bug` as below.

```javascript
L.Mapzen.bug({
  name: 'Web Map',
  link: 'https://erasermap.com/maps',
  tweet: '@mapzen',
  repo: 'https://github.com/mapzen/web-map'
});
bug.addTo(map);
```

- `L.Mapzen.locator`

puts Locator Control compoenent to the map. You can check its default option for MapzenJs at [its source file](https://github.com/mapzen/web-map/blob/master/src/js/components/locator.js#L14). You can check more possible options on [Leaflet Locatle Control page](https://github.com/domoritz/leaflet-locatecontrol).

``` javascript
var locator = L.Mapzen.locator();
locator.setPosition('bottomright');
locator.addTo(map);
```

- `L.Mapzen.hash`

sets/reads the hash value for components inside of the map, so that the map can offer diplink for the status that you are on. You can pass the componenents that you want hash for as arguments when hash is initialized. Hash currently received `L.Mapzen.map` and `L.Mapzen.geocoder` as arguments.

```javascript
L.Mapzen.hash({
  map: map,
  geocoder: geocoder
})
```


### Build Locally

MapzenJS uses [npm]((https://docs.npmjs.com/getting-started/installing-node)) for its building process.

```
npm install
```
The comand above will install depandancies for the development.

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



### MapzenJS is consist of awesome open source projects :two_hearts:

This is the list of the great projects composing MapzenJS.

- [Leaflet](http://leafletjs.com/)
- [Leaflet Locatle Control](https://github.com/domoritz/leaflet-locatecontrol)
- [Mapzen Leaflet Geocoder](https://github.com/mapzen/leaflet-geocoder)
- [Mapzen Bug](https://github.com/mapzen/scarab/tree/master/src/components/bug)