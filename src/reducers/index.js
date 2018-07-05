import { combineReducers } from 'redux';
import {
  SELECT_MODEOFTRAVEL,
  ADD_LOCATION,
  SET_ACTIVEMARKER,
  SET_ORIGINMARKER,
  INVALIDATE_DIRECTIONS,
  REQUEST_DIRECTIONS,
  RECIEVE_DIRECTIONS
} from '../actions';

import pointsOfInterest from '../data/pointsOfInterest';

function modeOfTravel (state = 'DRIVING', action) {
  switch (action.type) {
    case SELECT_MODEOFTRAVEL:
      return action.modeOfTravel
    default:
      return state
  }
}

function locations (state = pointsOfInterest, action) {
  switch (action.type) {
    case ADD_LOCATION:
      return [
        ...state,
        Object.assign({}, action.data, { id: state.length + 1 })
      ]
    default:
      return state
  }
}

function activeMarker (state = pointsOfInterest[6], action) {
  switch (action.type) {
    case SET_ACTIVEMARKER:
      return action.data
    default:
      return state
  }
}

function originMarker (state = pointsOfInterest[0], action) {
  switch (action.type) {
    case SET_ORIGINMARKER:
      return action.data
    default:
      return state
  }
}

function directions (
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

function directionsByOriginDestination (state = {}, action) {

  switch (action.type) {
    case INVALIDATE_DIRECTIONS:
    case RECIEVE_DIRECTIONS:
    case REQUEST_DIRECTIONS:

    const { modeOfTravel, originMarker, activeMarker } = action
    const originMarkerId = originMarker.id
    const activeMarkerId = activeMarker.id

    const calculatedId = `${modeOfTravel}-${originMarkerId}-${activeMarkerId}`
      return Object.assign({}, state, {
        [calculatedId]: directions(state[calculatedId], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  modeOfTravel,
  locations,
  activeMarker,
  originMarker,
  directions,
  directionsByOriginDestination
})

export default rootReducer
