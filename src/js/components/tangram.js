// Tangram can't be bundled from source since it needs to be able to access a full copy of itself
// (either as a URL or full string of all source code) in order to load itself into web workers
// This script injects the Tangram with script tag, so that Tangram doesn't need to be included with outside tag

var TangramScript = (function () {
  var tangramScriptURL = 'https://mapzen.com/tangram/0.8/tangram.min.js';
  var oScript;

  var loadError = function (oError) {
    console.log(oError);
    throw new URIError('The script ' + oError.target.src + ' is not accessible.');
  };

  var importScript = function (sSrc) {
    oScript = document.createElement('script');

    oScript.type = 'text/javascript';
    oScript.onerror = loadError;
    if (document.currentScript) document.currentScript.parentNode.insertBefore(oScript, document.currentScript);
    // If browser doesn't support currentscript position
    // insert script inside of head
    else document.getElementsByTagName('head')[0].appendChild(oScript);
    oScript.src = sSrc;
  };

  // Start importing script as soon as Mapzen.js started
  // When there is no Tangram object available.
  if (typeof Tangram === 'undefined') importScript(tangramScriptURL);
  // Return script element to get onload event from
  return {
    scriptEl: oScript
  };
})();

module.exports = TangramScript;
