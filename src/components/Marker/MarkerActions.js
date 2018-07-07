export const SET_ACTIVE_MARKER = 'SET_ACTIVE_MARKER'

export const setActiveMarker = data => ({
  type: SET_ACTIVE_MARKER,
  data: {
    lat: data.lat,
    lng: data.lng,
    id: data.id
  }
})

export const SET_ORIGIN_MARKER = 'SET_ORIGIN_MARKER'

export const setOriginMarker = data => ({
  type: SET_ORIGIN_MARKER,
  data: {
    lat: data.lat,
    lng: data.lng,
    id: data.id
  }
})
