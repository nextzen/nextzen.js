(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.WebMap = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function(hashable) {
  "use strict";
  /* jshint -W014 */

  hashable.version = "1.5.5";

  hashable.hash = function(loc) {
    if (!loc) loc = window.location;

    var hash = {},
        data = null,
        current,
        format = hashable.format.path(),
        parse = format.parse,
        onchange = function() { return; },
        def = hashable.functor(null),
        valid = hashable.functor(false),
        writing = false;

    hash.data = function(d) {
      if (!arguments.length) return data;
      data = d;
      return hash;
    };

    hash.set = function(d) {
      if (typeof d === "string") {
        loc.hash = d;
        return hash;
      } else {
        return hash.data(d).write();
      }
    };

    hash.update = function(d) {
      hashable.extend(data, d);
      return hash;
    };

    hash.write = function(silent) {
      if (silent) writing = true;
      loc.hash = format(data);
      if (silent) writing = false;
      return hash;
    };

    hash.read = function() {
      change();
      return hash;
    };

    hash.format = function(fmt) {
      if (!arguments.length) return format;
      if (typeof fmt === "string") {
        fmt = hashable.format(fmt);
      }
      format = fmt;
      if (typeof format.parse === "function") {
        parse = format.parse;
      }
      return hash;
    };

    hash.parse = function(fn) {
      if (!arguments.length) return parse;
      parse = fn;
      return hash;
    };

    hash.url = function(d, merge) {
      if (!arguments.length) d = data;
      if (merge) d = hashable.extend({}, data, d);
      return "#" + format(d);
    };

    hash.enable = function() {
      window.addEventListener("hashchange", change);
      return hash;
    };

    hash.disable = function() {
      window.removeEventListener("hashchange", change);
      return hash;
    };

    hash.change = function(callback) {
      if (!arguments.length) return onchange;
      onchange = callback;
      return hash;
    };

    hash.valid = function(f) {
      if (!arguments.length) return valid;
      valid = hashable.functor(f);
      return hash;
    };

    hash.href = function(selection) {
      selection.on("click.hashable", function(d) {
        this.href = hash.url(d);
      });
    };

    hash.href.merge = function(selection) {
      selection.on("click.hashable", function(d) {
        this.href = hash.url(d, true);
      });
    };

    hash.href.parse = function(d) {
      return parse(this.getAttribute("href").substr(1));
    };

    hash.check = function() {
      if (loc.hash) {
        // console.log("reading:", loc.hash);
        return hash.read();
      } else {
        // console.log("updating...");
      }
      onchange.call(hash, {
        previous: null,
        data: data || (data = def.call(hash)),
        diff: hashable.diff({}, data)
      });
      return hash.write();
    };

    hash.default = function(d) {
      if (!arguments.length) return def;
      def = hashable.functor(d);
      return hash;
    };

    function change() {
      // prevent recursive change callbacks
      if (writing) return;

      // console.log("change():", current, "->", loc.hash);
      var url = loc.hash.substr(1);
      if (url != current) {
        var previous = data;
        data = parse.call(hash, url);
        if (!data && valid.call(format, url)) {
          // console.warn("valid:", url);
        } else if (!data && def) {
          data = def.call(hash, previous);
          hash.write(true);
          url = loc.hash.substr(1);
        }
        var diff = hashable.diff(previous, data);
        onchange.call(hash, {
          url:      url,
          data:     data,
          previous: previous,
          diff:     diff
        });
        current = url;
      }
    }

    return hash;
  };

  hashable.validFragment = function(fragment) {
    return !!document.getElementById(fragment);
  };

  hashable.format = function(fmt) {
    var query = false;
    if (!fmt) fmt = "";
    else if (fmt.charAt(fmt.length - 1) === "?") {
      query = true;
      fmt = fmt.substr(0, fmt.length - 1);
    }

    var keys = [],
        word = "([-\\w\\.]+)",
        wordPattern = new RegExp("{" + word + "}", "g"),
        pattern = new RegExp("^" + fmt.replace(wordPattern, function(_, key) {
          keys.push(key);
          return word;
        }) + "$");

    // console.log("pattern:", pattern, "keys:", keys);

    var format = function(data) {
      if (!data) data = {};

      var used = [],
          str = fmt.replace(wordPattern, function(_, key) {
            return data[key];
          });

      if (!query) return str;

      var qkeys = Object.keys(data)
        .filter(function(key) {
          return keys.indexOf(key) === -1;
        });
      return qkeys.length
        ? [str, hashable.qs.format(hashable.copy(data, qkeys))].join("?")
        : str;
    };

    format.match = function(str) {
      if (query) {
        str = str.split("?", 2)[0];
      }
      return str.match(pattern);
    };

    format.parse = function(str) {
      var qdata;
      if (query) {
        var bits = str.split("?", 2);
        str = bits[0];
        qdata = hashable.qs.parse(bits[1]);
        if (qdata) {
          if (Array.isArray(query)) {
            qdata = hashable.copy(qdata, query);
          } else {
            // copy only the keys that aren't in the format
            var qkeys = Object.keys(qdata)
              .filter(function(key) {
                return keys.indexOf(key) === -1;
              });
            qdata = hashable.copy(qdata, qkeys);
          }
        }
      }
      var match = format.match(str);
      if (match) {
        var data = {};
        keys.forEach(function(key, i) {
          data[key] = match[i + 1];
        });
        if (qdata) hashable.extend(data, qdata);
        return data;
      }
      return null;
    };

    format.query = function(q) {
      if (!arguments.length) return query;
      query = q;
      return format;
    };

    format.toString = function() {
      return fmt;
    };

    return format;
  };

  /*
   * path + query string formatter, creates data in the form:
   *
   * {path: "bit/after/hash", <query parameters>}
   *
   * e.g.:
   *
   * "#foo/bar?qux=1" -> {path: "foo/bar", qux: 1}
   */
  hashable.format.path = function() {

    var format = function(data) {
      data = hashable.extend({}, data);
      var path = data.path || "";
      delete data.path;
      var query = hashable.qs.format(data);
      return query
        ? [path, query].join("?")
        : path;
    };

    format.match = function(str) {
      return true;
    };

    format.parse = function(str) {
      var bits = str.split("?", 2),
          data = {path: bits[0]};
      if (bits.length > 1) {
        var query = hashable.qs.parse(bits[1]);
        if (query) {
          return hashable.extend(data, query);
        }
      }
      return data;
    };

    return format;
  };

  hashable.format.map = function(f) {
    var fmt = hashable.format(f || "{z}/{y}/{x}")
          .query(true),
        precision = function(z) {
          return Math.max(0, Math.ceil(Math.log(z) / Math.LN2));
        };

    var format = function(data) {
      if (data && !hashable.empty(data.z)) {
        var p = precision(+data.z);
        data.x = (+data.x).toFixed(p);
        data.y = (+data.y).toFixed(p);
      }
      return fmt(data);
    };

    format.match = function(str) {
      return fmt.match(str);
    };

    format.parse = function(str) {
      var parsed = fmt.parse(str);
      if (parsed) {
        parsed.z = +parsed.z;
        parsed.x = +parsed.x;
        parsed.y = +parsed.y;
        if (isNaN(parsed.z) || isNaN(parsed.x) || isNaN(parsed.y)) {
          return null;
        }
      }
      return parsed;
    };

    format.query = function(q) {
      if (!arguments.length) return fmt.query();
      fmt.query(q);
      return fmt;
    };

    format.precision = function(p) {
      if (!arguments.length) return precision;
      precision = hashable.functor(p);
      return format;
    };

    return format;
  };

  /*
   * query string parse & format
   */
  hashable.qs = (function() {
    var qs = {
      separator: "&",
    };

    var replacements = qs.replacements = {
      "%20": "+",
      "%2C": ","
    };

    qs.parse = function(str) {
      if (!str || str === "?") return null;
      if (str.charAt(0) === "?") str = str.substr(1);
      var data = {};
      str.split(qs.separator)
        .forEach(function(bit) {
          var parts = bit.split("="),
              key = decode(parts[0]),
              val = bit.substr(key.length + 1);
          if (parts.length === 1 || val === "true") {
            data[key] = true;
          } else if (val === "false") {
            data[key] = false;
          } else {
            data[key] = decode(val);
          }
        });
      return data;
    };

    qs.format = function(data, sortKeys) {
      if (typeof data === "string") return data;
      else if (data === null || typeof data === "undefined") return "";

      var keys = Object.keys(data)
        .filter(function(key) {
          return !hashable.empty(data[key]);
        });
      if (sortKeys) {
        keys = keys.sort(function(a, b) {
          return a > b ? 1 : a < b ? -1 : 0;
        });
      }
      var bits = keys.map(function(key) {
        return (data[key] === true)
          ? key
          : [key, encode(data[key])].join("=");
      });
      return bits.length
        ? bits.join(qs.separator)
        : "";
    };

    function encode(d) {
      return encodeURIComponent(d)
        .replace(/(\%[A-F0-9]{2})/g, function(_, hex) {
          return hex in replacements
            ? replacements[hex]
            : hex;
        });
    }

    function decode(str) {
      return decodeURIComponent(str.replace(/\+/g, " "));
    }

    return qs;
  })();

  /*
   * extend an object with one or more other objects' keys
   */
  hashable.extend = function(a, b, etc) {
    [].slice.call(arguments, 1).forEach(function(o) {
      if (!o) return;
      for (var key in o) {
        a[key] = o[key];
      }
    });
    return a;
  };

  /*
   * find the difference (non-recursive) between two objects,
   * returned as an array of objects like:
   *
   * {op: "remove", value: <value>}
   * a key was set in the first object, but not set in the second.
   *
   * {op: "change", value: [<value>, <value>]}
   * a key was changed between the first and second object. value[0] is the
   * original, and value[1] is the changed value.
   *
   * {op: "add", value: <value>}
   * a key was set in the second object but not the first.
   */
  hashable.diff = function(a, b) {
    var ak = Object.keys(a || {}),
        bk = Object.keys(b || {}),
        diff = {},
        key, i;
    while (ak.length) {
      key = ak.shift();
      i = bk.indexOf(key);
      if (i === -1) {
        diff[key] = {op: "remove", value: a[key]};
      } else if (b[key] != a[key]) {
        diff[key] = {op: "change", value: [a[key], b[key]]};
        bk.splice(i, 1);
      } else {
        bk.splice(i, 1);
      }
    }
    while (bk.length) {
      key = bk.shift();
      diff[key] = {op: "add", value: b[key]};
    }
    return (Object.keys(diff).length > 0)
      ? diff
      : null;
  };

  hashable.copy = function(obj, keys) {
    var copy = {};
    keys.forEach(function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

  hashable.empty = function(d) {
    return (d === null)
        || (typeof d === "undefined")
        || d.length === 0;
  };

  hashable.functor = function(d) {
    return (typeof d === "function")
      ? d
      : function() { return d; };
  };


  /**
   * Leaflet plugin support
   */
  if (typeof L === "object") {
    L.Hash = L.hash = function() {
      var hash = hashable.hash()
        .format(hashable.format.map())
        .enable();

      var moveend, zoomend, viewreset,
          changed = false;

      hash.onAdd = function(map) {
        hash.change(function(e) {
          var view = e.data;
          if (view) {
            // console.log("view:", view);
            map.setView([view.y, view.x], view.z,
              changed ? null : {animate: false});
            changed = true;
            map.fireEvent("hashchange", e);
          }
        })
        .default(function() {
          return {
            z: map.getZoom(),
            x: map.getCenter().lng,
            y: map.getCenter().lat
          };
        })
        .enable();

        map
          .on("moveend", moveend = function() {
            var c = map.getCenter();
            hash.update({x: c.lng, y: c.lat})
              .write();
          })
          .on("zoomend", zoomend = function() {
            var z = map.getZoom();
            hash.update({z: z})
              .write();
          })
          .on("viewreset", viewreset = function() {
            var c = map.getCenter(),
                z = map.getZoom();
            hash.update({x: c.lng, y: c.lat, z: z})
              .write();
          });
      };

      hash.onRemove = function(map) {
        hash.change(null).disable();
        map
          .off("moveend", moveend)
          .off("zoomend", zoomend)
          .off("viewreset", viewreset);
      };

      hash.addTo = function(map) {
        map.addLayer(hash);
        return hash;
      };

      return hash;
    };

  } // end Leaflet support

})(typeof module === "object" ? module.exports : this.hashable = {});

},{}],2:[function(require,module,exports){
'use strict';

module.exports = (function WebMap () {
  var map;
  var hashable = require('hashable');

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
        .change(function (e) {
          var data = e.data;
          map.setView([data.lat, data.lng], data.z);
        })
        .default(function () {
          var fmt = hashable.format.path();
          var path = fmt.parse(window.location.hash);
          return {
            z: path.z || map.getZoom(),
            lng: path.lng || map.getCenter().lng,
            lat: path.lat || map.getCenter().lat
          };
        })
        .enable()
        .check();

      map.on('moveend', function () {
        var center = map.getCenter();
        var fmt = hashable.format.path();
        var p = precision(hash.data().z);
        hash.update({lng: center.lng.toFixed(p), lat: center.lat.toFixed(p)});
        var formattedData = fmt(hash.data());
        window.history.replaceState({}, null, '#' + formattedData);
      })
        .on('zoomend', function () {
          hash.update({z: map.getZoom()});
          var fmt = hashable.format.path(); 
          var formattedData = fmt(hash.data());
          window.history.replaceState({}, null, '#' + formattedData);
        });

      var precision = function(z) {
        return Math.max(0, Math.ceil(Math.log(z) / Math.LN2));
      };
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

},{"hashable":1}]},{},[2])(2)
});