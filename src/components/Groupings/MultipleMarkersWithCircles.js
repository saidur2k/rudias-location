import React from 'react'
import PropTypes from 'prop-types'

import Marker from '../Elements/Marker'
import Circle from '../Elements/Circle'

import getLatLng from '../../lib/getLatLng'

const MarkerWithCircle = ({ item, shouldMarkerBeActive, setActiveMarker }) => {
  const { id, title, type } = item
  const keyId = `div-${id}`
  const position = getLatLng(item)
  const active = shouldMarkerBeActive(item)

  return (
    <div key={keyId}>
      {Marker({ id, position, active, setActiveMarker, title })}
      {Circle({ position, type })}
    </div>
  )
}

MarkerWithCircle.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  shouldMarkerBeActive: PropTypes.func.isRequired,
  setActiveMarker: PropTypes.func.isRequired
}

const MultipleMarkersWithCircles = ({
  locations,
  shouldMarkerBeActive,
  setActiveMarker
}) =>
  locations.map(item =>
    MarkerWithCircle({ item, shouldMarkerBeActive, setActiveMarker })
  )

MultipleMarkersWithCircles.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired,
  shouldMarkerBeActive: PropTypes.func.isRequired,
  setActiveMarker: PropTypes.func.isRequired
}

export default MultipleMarkersWithCircles
