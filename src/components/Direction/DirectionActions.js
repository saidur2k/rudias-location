import { directionId } from './DirectionHelper'
import { getDirectionsService } from '../../services/getDirectionsService'

export const REQUEST_DIRECTIONS = 'REQUEST_DIRECTIONS'
export const RECIEVE_DIRECTIONS = 'RECIEVE_DIRECTIONS'
export const INVALIDATE_DIRECTIONS = 'INVALIDATE_DIRECTIONS'

export function requestDirections ({ modeOfTravel, originMarker, activeMarker }) {
  return {
    type: REQUEST_DIRECTIONS,
    modeOfTravel,
    originMarker,
    activeMarker
  }
}

export function receiveDirections (
  { modeOfTravel, originMarker, activeMarker },
  response
) {
  return {
    type: RECIEVE_DIRECTIONS,
    modeOfTravel,
    originMarker,
    activeMarker,
    directions: response,
    receivedAt: Date.now()
  }
}

export function invalidateDirections ({ modeOfTravel, originMarker, activeMarker }) {
  return {
    type: INVALIDATE_DIRECTIONS,
    modeOfTravel,
    originMarker,
    activeMarker
  }
}

const fetchDirections = ({ modeOfTravel, originMarker, activeMarker }) => dispatch => {
  dispatch(requestDirections({ modeOfTravel, originMarker, activeMarker }))

  return getDirectionsService(originMarker, activeMarker, modeOfTravel)
    .then(
      response => response,
      error => console.log('An error occurred.', error)
    )
    .then(data =>
      dispatch(receiveDirections({ modeOfTravel, originMarker, activeMarker }, data))
    )
}

const shouldFetchDirections = (
  state,
  { modeOfTravel, originMarker, activeMarker }
) => {
  if (!originMarker || !activeMarker) {
    return false
  }

  const id = directionId({modeOfTravel, originMarker, activeMarker})

  if (!id) {
    return true
  }

  const directions = state.directionsByOriginDestination[id]

  if (!directions) {
    return true
  }

  if (directions.isFetching) {
    return false
  }

  return directions.didInvalidate
}

export const fetchDirectionsIfNeeded = ({
  modeOfTravel,
  originMarker,
  activeMarker
}) => (dispatch, getState) => {
  if (
    shouldFetchDirections(getState(), { modeOfTravel, originMarker, activeMarker })
  ) {
    return dispatch(fetchDirections({ modeOfTravel, originMarker, activeMarker }))
  }
}
