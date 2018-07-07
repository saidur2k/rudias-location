import pointsOfInterest from '../../data/pointsOfInterest'
import { ADD_LOCATION } from './SearchBoxActions'

export function locations (state = pointsOfInterest, action) {
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
