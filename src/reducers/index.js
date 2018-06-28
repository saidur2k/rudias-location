import { combineReducers } from 'redux'
import {
  SELECT_MODEOFTRAVEL,
  ADD_LOCATION,
  SET_ACTIVEMARKER,
  SET_ORIGINMARKER
} from '../actions'

import pointsOfInterest from '../data/pointsOfInterest'

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

const rootReducer = combineReducers({
  modeOfTravel,
  locations,
  activeMarker,
  originMarker
})

export default rootReducer
