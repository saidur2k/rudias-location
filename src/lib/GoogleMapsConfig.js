import React from 'react'
import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()

const GoogleMapsConfig = {
  googleMapURL:
    `https://maps.googleapis.com/maps/api/js?key=${env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `600px` }} />,
  mapElement: <div style={{ height: `100%` }} />
}

export default GoogleMapsConfig
