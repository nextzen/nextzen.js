before(function() {
   console.log('Leaflet version: ' + L.version);
})

describe('leaflet', function() {

  var el;
  var webmap;

  beforeEach('initialize map', function () {
    el = document.createElement('div');
    // DOM needs to be visible: appended to the body and have dimensions
    // in order for .focus() to work properly
    el.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%;';
    document.body.appendChild(el);
    webmap = WebMap.init(el,[51.505, -0.09], 13);
  });

  it('check which Leaflet version it is', function() {
    expect(L.version).to.equal('0.7.7');
  });

  it('check that zoom is being set', function(){
    var leafletMap = webmap.getLeafletMap();
    expect(leafletMap.getZoom()).to.equal(13);
  });

});
