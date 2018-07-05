import React from 'react'
import PropTypes from 'prop-types'
import { Circle as GoogleCircle } from 'react-google-maps'

const Circle = ({ type, item }) => {
  const color = type && type === 'custom' ? '#00FF00' : '#e8ffa1'

  const styleOptions = {
    strokeColor: color,
    fillColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.45
  }

  const { lat, lng } = item

  return (
    <GoogleCircle radius={1000} center={{ lat, lng }} options={styleOptions} />
  )
}

Circle.propTypes = {
  type: PropTypes.string.isRequired,
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  })
}

export default Circle
