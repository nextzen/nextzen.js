# Get started with mapzen.js

To get started using mapzen.js, you need to link to the CSS and one of the JS files in the `<head>` section. Both the source JavaScript file or the minified version, which is a compressed file that improves performance, are available.

To reference the mapzen.js cascading style sheet (CSS) and JavaScript file, add these links to your page.

```html
<!-- style sheet for mapzen.js -->
<link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">

<!-- latest version of mapzen.js-->
<script src="https://mapzen.com/js/mapzen.js"></script>

<!-- latest minified version of mapzen.js -->
<script src="https://mapzen.com/js/mapzen.min.js"></script>
```

## Using a pinned version

We will change and update Mapzen.js software over time to new features or remove old ones. The standard links above will always be the latest version of Mapzen.js. If you’d like to link to code that will never be modified, you can use a pinned version of Mapzen.js.

To reference a pinned version of the Mapzen.js CSS and JavaScript files, find the release you’d like to use [on our releases page](https://github.com/mapzen/mapzen.js/releases) and add links like these with the correct `major.minor.patch` version number to your page:

```html
<!-- style sheet for mapzen.js -->
<link rel="stylesheet" href="https://mapzen.com/js/0.6.0/mapzen.css">

<!-- latest version of mapzen.js-->
<script src="https://mapzen.com/js/0.6.0/mapzen.js"></script>

<!-- latest minified version of mapzen.js -->
<script src="https://mapzen.com/js/0.6.0/mapzen.min.js"></script>
```

## Using the standalone version

Currently, mapzen.js embeds [Leaflet 1.0](http://leafletjs.com/reference-1.0.0.html) in it. If you need to use your own version of Leaflet with mapzen.js, you can use the standalone version, which doesn't include Leaflet.

To reference the standalone version of the mapzen.js CSS and JavaScript files, add these links to your page followed by your own Leaflet links.

```html
<!-- style sheet for mapzen.js -->
<link rel="stylesheet" href="https://mapzen.com/js/mapzen.standalone.css">

<!-- latest version of stasndalone mapzen.js-->
<script src="https://mapzen.com/js/mapzen.standalone.js"></script>

<!-- latest minified version of standalone mapzen.js -->
<script src="https://mapzen.com/js/mapzen.standalone.min.js"></script>
```

## Create a basic web map using mapzen.js

In this walkthrough, you will learn how to create a basic web map using mapzen.js. You should have some familiarity with HTML/CSS and JavaScript, but the source code is provided. Any operating system or text editor will work, but you will need an internet connection while you are working.

### Create an index page

To get started making your map, you will need to use a text editor to update the HTML.

Suggested text editor applications include [Atom - OS X, Windows, Linux](https://atom.io/); [Notepad++ - Windows](https://notepad-plus-plus.org/); [TextWrangler - OS X](http://www.barebones.com/products/textwrangler/); and  [Sublime - OS X, Windows, Linux; free trial](http://www.sublimetext.com/). While you can use the apps installed with your operating system, such as Notepad or TextEdit, they do not provide the helpful indentations, code coloring and autocomplete, or text alignment options found in the other editors. For TextEdit, you must go to the Format menu and click Make Plain Text to use the plain-text version of the file. Do not use an app that applies rich formatting, such as Word or Wordpad.

The end of the page has a finished version of the HTML that you can use to check your work or review if you need to troubleshoot an error.

1. Start your text editor with a blank document and copy and paste the following HTML. (Note: If the text editor you are using requires you to name and save a document at the time when it is first created, call the file `index.html`.)

    ```html
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
      </body>
    </html>
    ```

2. In the `<head>` tag, add a title, such as `<title>My Web Map</title>`.
3. On the next line, add a metadata tag so you can properly display diacritics and characters from different languages.

    ```html
    <meta charset="utf-8">
    ```

4. Name your the document `index.html` (where the file name is `index` and the type is `.html`) and save it.
5. Drag your index.html file onto a web browser tab. It should show your title, `Simple Web Map`, but the web page canvas will be blank.

Your HTML should look like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Web Map</title>
    <meta charset="utf-8">
  </head>
  <body>
  </body>
</html>
```

### Add references to CSS and JavaScript files

A cascading style sheet (CSS) file is used to style a webpage, including layout and fonts, and JavaScript adds functionality to the page. In your `index.html` file, you need to list the CSS and JavaScript files.

1. In `index.html`, at the bottom of the `<head>` section, add references to the mapzen.js CSS and JavaScript files. You are linking to these from a remote website, rather than from a file on your machine.

    ```html
    <link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">
    <script src="https://mapzen.com/js/mapzen.min.js"></script>
    ```

2. Save your edits and refresh the browser. The webpage should still appear empty because you have not added any code to interact with these references.

After adding these, your index.html file should look something like this.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Web Map</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">
    <script src="https://mapzen.com/js/mapzen.min.js"></script>
  </head>
  <body>
  </body>
</html>
```

### Add a map to the page

To display a Leaflet map on a page, you need a `<div>` element, which is a container on the page that groups elements, with an ID value. If you want to know more about initializing a Leaflet map, see the [Leaflet getting started documentation](http://leafletjs.com/examples/quick-start.html).

1. At the bottom of the `<head>` section, after the references you added in the earlier steps, add a `<style>` tag and the following attributes to set the size of the map on your webpage.

    ```html
    <style>
      #map {
        height: 100%;
        width: 100%;
        position: absolute;
      }
      html,body{margin: 0; padding: 0;}
    </style>
    ```

2. At the top of the `<body>` section, add the `<div>`.

    ```html
    <div id="map"></div>
    ```

3. Directly after the `<div>`, add this JavaScript code within a `<script>` tag to initialize a map.

    ```html
    <script>
      // Add a map to the 'map' div
      var map = L.Mapzen.map('map');
      // Set the center of the map to be the San Francisco Bay Area at zoom level 12
      map.setView([37.7749, -122.4194], 12);
    </script>
    ```

4. Save your edits and refresh the browser.

Your index.html should look something like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Web Map</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">
    <script src="https://mapzen.com/js/mapzen.min.js"></script>
    <style>
      #map {
        height: 100%;
        width: 100%;
        position: absolute;
      }
      html,body{margin: 0; padding: 0;}
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map = L.Mapzen.map('map');
      map.setView([37.7749, -122.4194], 12);
    </script>
  </body>
</html>
```

At this point, you have a map! You should see a map, zoom controls, and attribution in the bottom corner.
