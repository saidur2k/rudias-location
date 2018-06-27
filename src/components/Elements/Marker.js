import React from 'react'
import PropTypes from 'prop-types'

import { Marker as GoogleMarker } from 'react-google-maps'

import pin from './icons/map-pin.png'
import pinActive from './icons/map-pin-active.png'

const labelOptions = (title) => ({
  text: title,
  color: '#eb3a44',
  fontSize: '12px'
})

const iconOptions = (icon) => ({
  url: `${icon}`,
  scaledSize: new window.google.maps.Size(32, 32)
})

const Marker = ({ id, position, active, setActiveMarker, title }) => {
  const pinIcon = active ? pinActive : pin
  return (
    <GoogleMarker
      position={position}
      icon={iconOptions(pinIcon)}
      onClick={() => setActiveMarker(position)}
      label={labelOptions(title)}
      title={title}
    />
  )
}

Marker.propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }),
  active: PropTypes.bool.isRequired,
  setActiveMarker: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
export default Marker
