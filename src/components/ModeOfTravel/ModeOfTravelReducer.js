import {
  SELECT_MODE_OF_TRAVEL
} from './ModeOfTravelActions'

export function modeOfTravel (state = 'DRIVING', action) {
  switch (action.type) {
    case SELECT_MODE_OF_TRAVEL:
      return action.modeOfTravel
    default:
      return state
  }
}
