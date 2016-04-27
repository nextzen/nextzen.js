'use strict';

var WebMap = (function(){

  var map;

  var webMapObj = {
    init: function (domEl, centerLatLon, zoom) {
      map = L.map(domEl).setView(centerLatLon, zoom);
      //overriding double click behaviour to zoom up where it is clicked
      map.doubleClickZoom.disable();
      map.on('dblclick', function(e) {
        map.setView(e.latlng, map.getZoom() + 1);
      });
      //do not activate scroll wheel zoom when map is iframed
      map.scrollWheelZoom = this._isThisIframed();

      return this;
    },

    setupScene: function (scene) {
      var layer = Tangram.leafletLayer({
        scene: scene,
        attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
      });
      layer.addTo(map);
    },

    getLeafletMap: function() {
      return map;
    },

    _isThisIframed: function () {
      if(window.self !== window.top) return true;
      else return false;
    }
  };

  return webMapObj;

})()
