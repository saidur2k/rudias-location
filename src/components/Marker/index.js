import React from 'react'
import PropTypes from 'prop-types'

import { Marker as GoogleMarker } from 'react-google-maps'

import pin from './icons/map-pin.png'
import pinActive from './icons/map-pin-active.png'

const Marker = ({ item, active, setActiveMarker, title }) => {
  const pinIcon = active ? pinActive : pin

  const { lat, lng } = item

  const labelOptions = {
    text: title,
    color: '#175e5a',
    fontSize: '12px',
    fontWeight: 'bold'
  }

  const iconOptions = {
    url: `${pinIcon}`,
    scaledSize: new window.google.maps.Size(32, 32),
    labelOrigin: new window.google.maps.Point(36, 36)
  }

  return (
    <GoogleMarker
      position={{ lat, lng }}
      icon={iconOptions}
      onClick={() => setActiveMarker(item)}
      label={labelOptions}
      title={title}
    />
  )
}

Marker.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  active: PropTypes.bool.isRequired,
  setActiveMarker: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
export default Marker
