import { combineReducers } from 'redux'

import { modeOfTravel } from '../components/ModeOfTravel/ModeOfTravelReducer'
import { locations } from '../components/SearchBox/SearchBoxReducer'
import { activeMarker, originMarker } from '../components/Marker/MarkerReducer'
import { directions, directionsByOriginDestination } from '../components/Direction/DirectionReducer'

const rootReducer = combineReducers({
  modeOfTravel,
  locations,
  activeMarker,
  originMarker,
  directions,
  directionsByOriginDestination
})

export default rootReducer
