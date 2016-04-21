// var assert = require('chai').assert;
// var happen = require('happen');

// describe('zoom', function() {
//   it('zooms-in with double click', function(done) {
//      assert.equal(0, map.getZoom());

//      map.on('zoomend', function () {
//         assert.equal(1, map.getZoom());
//         map.off('zoomend');
//         done();
//      });

//      // Simulate double-click
//      happen.dblclick(map._container);
//   });
// });
describe("DOM Test", function () {

    var el = document.createElement("div");
    el.id = "myDiv";
    el.innerHTML = "Hello World!";
    document.body.appendChild(el);
    var myEl = document.getElementById('myDiv');

    it("has the right text", function () {
        (myEl.innerHTML).should.equal("Hello World!");
    });
});