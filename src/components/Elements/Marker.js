import React from 'react'
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

export default Marker
