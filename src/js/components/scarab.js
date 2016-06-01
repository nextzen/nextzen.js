'use strict';

var ScarabBug = require('./scarab/bug');


var Scarab = (function (options) {
  bug: ScarabBug
})


module.exports = Scarab;

module.exports.scarab = function(options)  {
  return new Scarab(options);
}