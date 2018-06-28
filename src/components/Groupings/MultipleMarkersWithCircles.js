import React from 'react'
import PropTypes from 'prop-types'

import Marker from '../Elements/Marker'
import Circle from '../Elements/Circle'

const MarkerWithCircle = ({ item, shouldMarkerBeActive, activeMarker, setActiveMarker }) => {
  const { id, title, type } = item
  const keyId = `div-${id}`
  let active = false
  if (activeMarker && id === activeMarker.id) {
    active = true
  }

  return (
    <div key={keyId}>
      {Marker({ item, active, setActiveMarker, title })}
      {Circle({ item, type })}
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
  setActiveMarker: PropTypes.func.isRequired,
  activeMarker: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired
}

const MultipleMarkersWithCircles = ({
  locations,
  activeMarker,
  setActiveMarker
}) =>
  locations.map(item =>
    MarkerWithCircle({ item, activeMarker, setActiveMarker })
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
  activeMarker: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  setActiveMarker: PropTypes.func.isRequired
}

export default MultipleMarkersWithCircles
