import React from 'react'
import { Circle as GoogleCircle } from 'react-google-maps'

const circleStyles = color => ({
  strokeColor: color,
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: color,
  fillOpacity: 0.35
})

const CustomCircle = ({ type, center }) => {
  const color = type && type === 'custom' ? '#00FF00' : '#FF0000'
  return (
    <GoogleCircle radius={1000} center={center} options={circleStyles(color)} />
  )
}

const Circle = ({ position, type }) => (
  <CustomCircle center={position} type={type} />
)

export default Circle
