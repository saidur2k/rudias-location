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
        addNewLocation={props.addNewLocation}
        controlPosition={window.google.maps.ControlPosition.TOP_RIGHT}
        setActiveMarker={props.setActiveMarker}
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
  addNewLocation: PropTypes.func.isRequired
}

export default LocationsGoogleMap
