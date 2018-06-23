import React from 'react'

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

export default MarkerWithCircle
