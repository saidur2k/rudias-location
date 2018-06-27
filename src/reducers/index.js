import { combineReducers } from 'redux'
import {
  SELECT_MODEOFTRAVEL
} from '../actions'

function selectedModeOfTravel(state = 'DRIVING', action) {
  console.log('here',state,action )

  switch (action.type) {
    case SELECT_MODEOFTRAVEL:
      return action.modeOfTravel
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedModeOfTravel
})

export default rootReducer
