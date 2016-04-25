var expect = require('chai').expect;
var assert = require('chai').assert;
var jsdom = require('mocha-jsdom');
var happen = require('happen');
var WebMap = require('./../index');

describe('web-map-stateful-url', function(){
  jsdom();
  var map;

  beforeEach(function() {
    var L = require('leaflet');
    map = new L.Map(document.createElement('div'));
  });

  it('check that zoom is being set',function(){
    map.setView([51.505, -0.09], 13);
    expect(map.getZoom()).to.eq(13);
    console.log(WebMap.draw())
  });

});


describe('leaflet', function() {
  jsdom();
  it('check which Leaflet version it is', function() {
    var L = require('leaflet');
    console.log(WebMap);
    expect(L.version).to.eq('0.7.7');
  });
});