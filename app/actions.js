function _updateCurrentPointAction(currentLocationObj) {
  return {
    type: 'updateCurrentPoint',
    currentPoint: currentLocationObj
  }
}


function _updateStartPointAction(locationObj) {
  return {
    type: 'updateStartPoint',
    startPoint: locationObj
  }
}



function _updateDestPointAction(locationObj) {
  return {
    type: 'updateDestPoint',
    destPoint: locationObj
  }
}



module.exports = {
  updateCurrentPointAction: _updateCurrentPointAction, 
  updateStartPointAction: _updateStartPointAction, 
  updateDestPointAction: _updateDestPointAction
};