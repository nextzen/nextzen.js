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

function _selectPlace(locationObj) {
  console.log('selectplace @_@');
  return {
    type: 'selectPlace',
    selectedPoint: locationObj
  }
}

function _setMapModeAction(mapMode) {
  return {
    type: 'setMapMode',
    mapMode: mapMode
  }
}

function _clearPoints() {
  return {
    type: 'clearPoints',
    startPoint: {},
    destPoint: {},
    selectedPoint: {}
  }
}
module.exports = {
  updateCurrentPointAction: _updateCurrentPointAction, 
  updateStartPointAction: _updateStartPointAction, 
  updateDestPointAction: _updateDestPointAction,
  setMapModeAction: _setMapModeAction,
  selectPlace: _selectPlace,
  clearPointsAction: _clearPoints
};