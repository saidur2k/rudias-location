import React from 'react'
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs
} from 'react-google-maps'

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
        bounds={props.bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_RIGHT}
        onPlacesChanged={props.onPlacesChanged}
      />
      {props.children}
    </GoogleMap>
  ))
)

export default LocationsGoogleMap
