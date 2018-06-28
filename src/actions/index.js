export const SELECT_MODEOFTRAVEL = 'SELECT_MODEOFTRAVEL'

export const selectModeOfTravel = modeOfTravel => {
  return {
    type: SELECT_MODEOFTRAVEL,
    modeOfTravel
  }
}

export const ADD_LOCATION = 'ADD_LOCATION'

export const addLocation = data => ({
  type: ADD_LOCATION,
  data: {
    title: data.title,
    lat: data.lat,
    lng: data.lng,
    type: data.type
  }
})

export const SET_ACTIVEMARKER = 'SET_ACTIVEMARKER'

export const setActiveMarker = data => ({
  type: SET_ACTIVEMARKER,
  data: {
    lat: data.lat,
    lng: data.lng,
    id: data.id
  }
})

export const SET_ORIGINMARKER = 'SET_ORIGINMARKER'

export const setOriginMarker = data => ({
  type: SET_ORIGINMARKER,
  data: {
    lat: data.lat,
    lng: data.lng,
    id: data.id
  }
})
