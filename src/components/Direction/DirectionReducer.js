import {
  INVALIDATE_DIRECTIONS,
  REQUEST_DIRECTIONS,
  RECIEVE_DIRECTIONS
} from './DirectionActions'

import { directionId } from './DirectionHelper'

export function directions (
  state = { isFetching: false, didInvalidate: false, items: [] },
  action
) {
  switch (action.type) {
    case INVALIDATE_DIRECTIONS:
      return Object.assign({}, state, { didInvalidate: true })
    case REQUEST_DIRECTIONS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECIEVE_DIRECTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [action.directions],
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export function directionsByOriginDestination (state = {}, action) {
  switch (action.type) {
    case INVALIDATE_DIRECTIONS:
    case RECIEVE_DIRECTIONS:
    case REQUEST_DIRECTIONS:

      const { modeOfTravel, originMarker, activeMarker } = action

      const id = directionId({modeOfTravel, originMarker, activeMarker})

      return Object.assign({}, state, {
        [id]: directions(state[id], action)
      })
    default:
      return state
  }
}
