import React from 'react'
import PropTypes from 'prop-types'
import { Circle } from 'react-google-maps'

const BaseCircle = ({ color, lat, lng }) => {
  const styleOptions = {
    strokeColor: color,
    fillColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.45
  }

  return (
    <Circle radius={1000} center={{ lat, lng }} options={styleOptions} />
  )
}

BaseCircle.propTypes = {
  color: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

export default BaseCircle
