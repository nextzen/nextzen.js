before(function () {
  console.log('Leaflet version: ' + L.version);
});

describe('leaflet', function () {
  var el;
  var webmap;
  var windowHistory;

  before('initialize map', function () {
    el = document.createElement('div');
    // DOM needs to be visible: appended to the body and have dimensions
    // in order for .focus() to work properly
    el.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%;';
    document.body.appendChild(el);
    windowHistory = window.history;
    webmap = Mapzen.map(el);
  });

  it('check which Leaflet version it is', function () {
    expect(L.version).to.equal('0.7.7');
  });

  it('checks that hashable is listening', function () {
    expect(window.location.hash).to.equal('#?z=13&lng=-0.09&lat=51.505');
  });

  it('checks that states are not pushed to history', function () {
    webmap.setView([51.505, -2.09], 13);
    expect(window.history).to.equal(windowHistory);
  });
});
