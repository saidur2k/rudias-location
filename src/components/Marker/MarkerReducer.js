import pointsOfInterest from '../../data/pointsOfInterest'

import {
  SET_ACTIVE_MARKER,
  SET_ORIGIN_MARKER
} from './MarkerActions'

export function activeMarker (state = pointsOfInterest[6], action) {
  switch (action.type) {
    case SET_ACTIVE_MARKER:
      return action.data
    default:
      return state
  }
}

export function originMarker (state = pointsOfInterest[0], action) {
  switch (action.type) {
    case SET_ORIGIN_MARKER:
      return action.data
    default:
      return state
  }
}
