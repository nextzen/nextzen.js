var Scarab = require('mapzen-scarab');

module.exports = Scarab;

module.exports.scarab = function(options) {
    return new Scarab(options);
};
