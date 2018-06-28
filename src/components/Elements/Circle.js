import React from 'react'
import PropTypes from 'prop-types'
import { Circle as GoogleCircle } from 'react-google-maps'

const circleStyles = color => ({
  strokeColor: color,
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: color,
  fillOpacity: 0.45
})

const Circle = ({ type, item }) => {
  const color = type && type === 'custom' ? '#00FF00' : '#e8ffa1'
  const {lat, lng} = item
  return (
    <GoogleCircle radius={1000} center={{lat, lng}} options={circleStyles(color)} />
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
