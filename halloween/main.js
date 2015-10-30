/*jslint browser: true*/
/*global Tangram, gui */

map = (function () {
    'use strict';

    var locations = {
        'Los Angeles': [34.0520, -118.2440, 16],
        'Oakland': [37.8044, -122.2708, 15],
        'New York': [40.70531887544228, -74.00976419448853, 15],
        'Seattle': [47.5937, -122.3215, 15]
    };

    var map_start_location = locations['New York'];

    /*** URL parsing ***/

    // leaflet-style URL hash pattern:
    // #[zoom],[lat],[lng]
    var url_hash = window.location.hash.slice(1, window.location.hash.length).split('/');

    if (url_hash.length == 3) {
        map_start_location = [url_hash[1],url_hash[2], url_hash[0]];
        // convert from strings
        map_start_location = map_start_location.map(Number);
    }

    /*** Map ***/

    var map = L.map('map', {
        "keyboardZoomOffset" : .05,
        scrollWheelZoom: false
    });

    var style_file = 'halloween.yaml';
    var url_search = window.location.search.slice(1);
    if (url_search.length > 0) {
        var ext = url_search.lastIndexOf('yaml');
        if (ext > -1) {
            style_file = url_search.substr(0, ext + 4);
        }
    }

    var layer = Tangram.leafletLayer({
        scene: style_file,
        numWorkers: 2,
        attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>',
        unloadInvisibleTiles: false,
        updateWhenIdle: false
    });

    window.layer = layer;
    var scene = layer.scene;
    window.scene = scene;

    // setView expects format ([lat, long], zoom)
    map.setView(map_start_location.slice(0, 3), map_start_location[2]);

    var hash = new L.Hash(map);

    /***** Render loop *****/

    window.addEventListener('load', function () {
        // Scene initialized
        layer.on('init', function() {
        });
        layer.addTo(map);
    });

    // map.once('focus', function() { map.scrollWheelZoom.enable(); });

    // toggle zooming with onclick
    map.on('click', function() {
        if (map.scrollWheelZoom.enabled()) {
            map.scrollWheelZoom.disable();
        } else {
            map.scrollWheelZoom.enable();
        }
    });

    var fog = document.getElementById('fog')
    var fog2 = document.getElementById('fog2-container')
    window.addEventListener('mousemove', function (e) {
        var posX = e.clientX
        var posY = e.clientY
        var offsetX = - (posX - (window.innerWidth / 2)) / 50
        var offsetY = - (posY - (window.innerHeight / 2)) / 50
        fog.style.transform = 'translate3d(' + offsetX + 'px, ' + offsetY + 'px, 0px)'
        fog2.style.transform = 'translate3d(' + offsetX / 2 + 'px, ' + offsetY / 2 + 'px, 0px)'
    })

    return map;

}());
