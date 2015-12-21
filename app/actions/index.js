export function updateCurrentPoint(currentLocationObj) {
  return {
    type: 'updateCurrentPoint',
    currentPoint: currentLocationObj
  }
}

export function updateStartPoint(locationObj) {
  return {
    type: 'updateStartPoint',
    startPoint: locationObj
  }
}

export function updateDestPoint(locationObj) {
  return {
    type: 'updateDestPoint',
    destPoint: locationObj
  }
}

export function selectPlace(locationObj) {

  return {
    type:'selectPlace',
    selectedPoint: locationObj,
    destPoint: locationObj
  }
}

export function setMapModeAction(mapMode) {
  return {
    type: 'setMapMode',
    mapMode: mapMode
  }
}

export function clearPoints() {
  return {
    type: 'clearPoints',
    startPoint: {},
    destPoint: {},
    selectedPoint: {}
  }
}
