/**
 * Mapzen API Key Check
 */

/**
 * The URL_PATTERN handles the old vector.mapzen.com origin (until it is fully
 * deprecated) as well as the new v1 tile.mapzen.com endpoint.
 *
 * Extensions include both vector and raster tile services.
 */
var URL_PATTERN = /((https?:)?\/\/(vector|tile).mapzen.com([a-z]|[A-Z]|[0-9]|\/|\{|\}|\.|\||:)+(topojson|geojson|mvt|png|tif|gz))/;

/**
 * A basic check to see if an API key string looks like a valid key.
 * Not *is* a valid key, just *looks like* one.
 *
 * @param {string} apiKey Mapzen API key string
 */
var isValidMapzenApiKey = function (apiKey) {
  return (typeof apiKey === 'string' && apiKey.match(/^[-a-z]+-[0-9a-zA-Z_-]{5,7}$/));
};

var warningCounter = 0;

var getKeyAndOptions = function (_key, _options) {
  var key;
  var options = {};

  if (typeof _key !== 'string' && typeof _key !== 'object') {
    // When nothing is passed
    key = L.Mapzen.apiKey;
  } else if (typeof _key === 'object') {
    // When the key is omitted and options is passed
    key = L.Mapzen.apiKey;
    options = _key;
  } else {
    key = _key;
    options = _options;
  }
  return {
    key: key,
    options: options
  }
}

/**
 * Throw console warning about missing API key
 *
 * @param {string} component Name of component with missing API key (optional)
 */
var throwApiKeyWarning = function (component) {
  component = component || 'all Mapzen Services';

  console.warn('A valid API key is required for access to ' + component);

  // Show expanded warning the first time
  if (warningCounter === 0) {
    console.warn('****************************** \n' +
                 'Generate your free API key at  \n' +
                 'https://mapzen.com/developers  \n' +
                 '******************************');
  }
  warningCounter++;
};

module.exports = {
  URL_PATTERN: URL_PATTERN,
  isValidMapzenApiKey: isValidMapzenApiKey,
  throwApiKeyWarning: throwApiKeyWarning,
  getKeyAndOptions: getKeyAndOptions
};

