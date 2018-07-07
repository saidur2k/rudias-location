import { createSelector } from 'reselect'

const {getDirectionsService} = require('../services/getDirectionsService')

const getModeOfTravel = (state) => state.modeOfTravel
const getOrigin = (state) => state.originMarker
const getDestination = (state) => state.activeMarker

export const getDirectionSelector = createSelector(
  [ getModeOfTravel, getOrigin, getDestination ],
  (modeOfTravel, originMarker, activeMarker) => {
    // if (!modeOfTravel || !originMarker || activeMarker) {
    //   return false
    // }

    console.log('here', modeOfTravel, originMarker, activeMarker)

    return getDirectionsService(
      originMarker,
      activeMarker,
      modeOfTravel
    )
      .then(
        response => response,
        error => console.log('An error occurred.', error)
      )
  }
)
