'use strict';

var L = require('leaflet');
var configInstance;

var Config = L.Class.extend({
  initialize: function(opts) {
    // If opts is passed to set up the config
    // Do nothing if instance is created to read
    if (opts) {
      this.apiKey = opts.apiKey;
    }
  },

  setApiKey: function(key) {
    this.apiKey = key;
  }
});


module.exports = function (opts) {
  // Config object needs to be singleton
  if (!configInstance) {
    configInstance = new Config(opts);
  } else {
    // Do nothing
  }
  return configInstance;
};
