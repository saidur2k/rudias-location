import React from 'react'
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs
} from 'react-google-maps'
import PropTypes from 'prop-types'

import SearchBox from './Elements/SearchBox'

const LocationsGoogleMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      ref={props.onMapLoad}
      zoom={props.zoom}
      defaultCenter={props.defaultCenter}
    >
      <SearchBox
        onSearchBoxMounted={props.onSearchBoxMounted}
        controlPosition={window.google.maps.ControlPosition.TOP_RIGHT}
        onPlacesChanged={props.onPlacesChanged}
      />
      {props.children}
    </GoogleMap>
  ))
)

LocationsGoogleMap.propTypes = {
  onMapLoad: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  onSearchBoxMounted: PropTypes.func.isRequired,
  onPlacesChanged: PropTypes.func.isRequired
}

export default LocationsGoogleMap
