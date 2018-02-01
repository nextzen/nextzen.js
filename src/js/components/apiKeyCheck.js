/**
 * API Key check for components
 */

var L = require('leaflet');

/**
 * The URL_PATTERN handles the old vector.mapzen.com origin (until it is fully
 * deprecated) as well as the new v1 tile.mapzen.com endpoint.
 *
 * Extensions include both vector and raster tile services.
 */
var URL_PATTERN = /((https?:)?\/\/tile.nextzen.org([a-z]|[A-Z]|[0-9]|\/|\{|\}|\.|\||:)+(topojson|geojson|mvt|png|tif|gz))/;

var getKeyAndOptions = function (_key, _options) {

  var key;
  var options = {};

  if (typeof _key !== 'string' && typeof _key !== 'object') {
    // When nothing is passed
    options = undefined;
    key = undefined;
  } else if (typeof _key === 'object') {
    // When the key is omitted and options is passed
    key = undefined;
    options = _key;
  } else {
    key = _key;
    options = _options || options;
  }
  return {
    key: key,
    options: options
  };
};

/**
 * Throw console warning about missing API key
 *
 * @param {string} component Name of component with missing API key (optional)
 */
var throwApiKeyWarning = function (component) {
  console.warn('A valid API key is required for access to ' + component);
};

module.exports = {
  URL_PATTERN: URL_PATTERN,
  throwApiKeyWarning: throwApiKeyWarning,
  getKeyAndOptions: getKeyAndOptions
};
