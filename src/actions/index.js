const { getDirectionsService } = require("../services/getDirectionsService");

export const SELECT_MODEOFTRAVEL = "SELECT_MODEOFTRAVEL";

export const selectModeOfTravel = modeOfTravel => {
  return {
    type: SELECT_MODEOFTRAVEL,
    modeOfTravel
  };
};

export const ADD_LOCATION = "ADD_LOCATION";

export const addLocation = data => ({
  type: ADD_LOCATION,
  data: {
    title: data.title,
    lat: data.lat,
    lng: data.lng,
    type: data.type
  }
});

export const SET_ACTIVEMARKER = "SET_ACTIVEMARKER";

export const setActiveMarker = data => ({
  type: SET_ACTIVEMARKER,
  data: {
    lat: data.lat,
    lng: data.lng,
    id: data.id
  }
});

export const SET_ORIGINMARKER = "SET_ORIGINMARKER";

export const setOriginMarker = data => ({
  type: SET_ORIGINMARKER,
  data: {
    lat: data.lat,
    lng: data.lng,
    id: data.id
  }
});

export const REQUEST_DIRECTIONS = "REQUEST_DIRECTIONS";

export function requestDirections({ modeOfTravel, originMarker, activeMarker }) {
  return {
    type: REQUEST_DIRECTIONS,
    modeOfTravel, originMarker, activeMarker
  };
}

export const RECIEVE_DIRECTIONS = "RECIEVE_DIRECTIONS";

export function receiveDirections(
  { modeOfTravel, originMarker, activeMarker },
  response
) {
  return {
    type: RECIEVE_DIRECTIONS,
    modeOfTravel, originMarker, activeMarker,
    directions: response,
    receivedAt: Date.now()
  };
}

export const INVALIDATE_DIRECTIONS = "INVALIDATE_DIRECTIONS";

export function invalidateDirections({ modeOfTravel, originMarker, activeMarker }) {
  return {
    type: INVALIDATE_DIRECTIONS,
    modeOfTravel, originMarker, activeMarker
  };
}

const fetchDirections = ({ modeOfTravel, originMarker, activeMarker }) => dispatch => {
  dispatch(requestDirections({ modeOfTravel, originMarker, activeMarker }));

  return getDirectionsService(originMarker, activeMarker, modeOfTravel)
    .then(
      response => response,
      error => console.log("An error occurred.", error)
    )
    .then(data =>
      dispatch(receiveDirections({ modeOfTravel, originMarker, activeMarker }, data))
    );
};

const shouldFetchDirections = (
  state,
  { modeOfTravel, originMarker, activeMarker }
) => {
  if(!originMarker || !activeMarker) {
    return false;
  }

  const calculatedId = `${modeOfTravel}-${originMarker.id}-${activeMarker.id}`
  if (!calculatedId) {
    return true;
  }
  const directions = state.directionsByOriginDestination[calculatedId];
  if (!directions) {
    return true;
  }
  if (directions.isFetching) {
    return false;
  }
  return directions.didInvalidate;
};

export const fetchDirectionsIfNeeded = ({
  modeOfTravel,
  originMarker,
  activeMarker
}) => (dispatch, getState) => {
  console.log({
    modeOfTravel,
    originMarker,
    activeMarker
  })
  if (
    shouldFetchDirections(getState(), { modeOfTravel, originMarker, activeMarker })
  ) {
    return dispatch(fetchDirections({ modeOfTravel, originMarker, activeMarker }));
  }
};
