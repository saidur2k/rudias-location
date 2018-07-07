export const SELECT_MODE_OF_TRAVEL = 'SELECT_MODE_OF_TRAVEL'

export const selectModeOfTravel = modeOfTravel => {
  return {
    type: SELECT_MODE_OF_TRAVEL,
    modeOfTravel
  }
}
