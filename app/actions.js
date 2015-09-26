function _updateCurrentPointAction(lat, lon) {
  return {
    type: 'updateCurrentPoint',
    currentPoint: {
      name : "Current location",
      lat: lat,
      lon: lon
    }
  }
}


function _updateStartPointAction(name, lat, lon) {
  return {
    type: 'updateStartPoint',
    startPoint: {
      name : name,
      lat: lat,
      lon: lon
    }
  }
}



function _updateDestPointAction(name, lat, lon) {
  return {
    type: 'updateDestPoint',
    destPoint: {
      name : name,
      lat: lat,
      lon: lon
    }
  }
}



module.exports = {
  updateCurrentPointAction: _updateCurrentPointAction, 
  updateStartPointAction: _updateStartPointAction, 
  updateDestPointAction: _updateDestPointAction
};