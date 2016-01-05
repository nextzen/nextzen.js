const initialState = {
  searchData: {},
  routeData: {},
}

export default function updateResponse(state = initialState, action = {}) {
  
  switch(action.type) {
    case 'updateRouteData':
      console.log('update routing');
      return {
        ...state,
        routeData: action.routeData
      };

    case 'updateSearchData':
      return { 
        ...state,
        destPoint: action.searchData
      };

    case 'clearRouteData':
    return {
      ...state,
      routeData: {}
    }

    default:
      return state;
  }
}