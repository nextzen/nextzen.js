(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WebMap = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = (function WebMap() {
  var map;
  //var Hashable = require('hashable');

  var webMapObj = {
    init: function (domEl, centerLatLon, zoom) {
      map = L.map(domEl).setView(centerLatLon, zoom);

      // overriding double click behaviour to zoom up where it is clicked
      map.doubleClickZoom.disable();
      map.on('dblclick', function (e) {
        map.setView(e.latlng, map.getZoom() + 1);
      });

      // do not activate scroll wheel zoom when map is iframed
      map.scrollWheelZoom = this._isThisIframed();
      this._setupHash();

      return this;
    },

    _setupHash: function () {
      // setting Location Hash with hashable
      var hash = hashable.hash()
        .format(hashable.format.map())
        .change(function (e) {
          var data = e.data;
          map.setView([data.y, data.x], data.z);
        })
        .default(function () {
          return {
            z: map.getZoom(),
            x: map.getCenter().lng,
            y: map.getCenter().lat
          };
        })
        .enable()
        .check();

      map.on('moveend', function () {
        var center = map.getCenter();
        hash.update({x: center.lng, y: center.lat})
        .write();
      })
        .on('zoomend', function () {
          hash.update({z: map.getZoom()})
          .write();
        });
    },

    setupScene: function (scene) {
      if (this._hasWebGL()) {
        // adding tangram layer
        var layer = Tangram.leafletLayer({
          scene: scene,
          attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | &copy; OSM contributors | <a href="https://mapzen.com/" target="_blank">Mapzen</a>'
        }).addTo(map);
      } else {
        // adding osm default tile layer for
        console.log('WebGL is not available, falling back to OSM default tile.');
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(map);
      }
    },

    getLeafletMap: function () {
      return map;
    },

    _hasWebGL: function () {
      try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (x) {
        return false;
      }
    },
    _isThisIframed: function () {
      if (window.self !== window.top) return true;
      else return false;
    }
  };

  return webMapObj;
})();

},{}]},{},[1])(1)
});