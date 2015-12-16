function LocationPoint(options){
  
  var name = options.name;
  var lat = options.lat;
  var lon = options.lon;
  var moreInfo = options.moreInfo || null;

  this.set(options){
    name = options.name;
    lat = options.lat;
    lon = options.lon;
    moreInfo = options.moreInfo || null;
  }
}

module.exports = LocationPoint;