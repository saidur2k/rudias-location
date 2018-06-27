export const SELECT_MODEOFTRAVEL = 'SELECT_MODEOFTRAVEL'

export const selectModeOfTravel = modeOfTravel => {
  return {
    type: SELECT_MODEOFTRAVEL,
    modeOfTravel
  }
}

export const addLocation = data => {
  return ({
    type: 'ADD_LOCATION',
    data: {
      title: data.title,
      lat: data.lat,
      lng: data.lng,
      id: data.length + 1,
      type: data.type
    }
  })
}
