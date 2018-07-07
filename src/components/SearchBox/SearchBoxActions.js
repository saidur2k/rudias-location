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
