// Use require only if available (ran from Node)
// if (typeof require == 'function') {
//     var assert = require('assert'),
//     L = require('leaflet');
//     YourApp = require('./../index');
// }


var expect = require('chai').expect;
var jsdom = require('mocha-jsdom');
var WebMap = require('./../index');


describe('leaflet', function() {
  jsdom();
  it('check which Leaflet version it is', function() {
    var L = require('leaflet');
    console.log(WebMap);
    expect(L.version).to.eq('0.7.7');
  });
});



describe('test', function() {
  jsdom();
  it('tests just to see how DOM works', function() {
    WebMap.domTest();
    var testEl = document.querySelector('#testEl');
    expect(testEl.innerHTML).to.equal('Hello world');
  });
});