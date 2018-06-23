import React from 'react'
import { Marker as GoogleMarker } from 'react-google-maps'

import pin from './icons/map-pin.png'
import pinActive from './icons/map-pin-active.png'

const labelOptions = (title) => ({
  text: title,
  color: '#eb3a44',
  fontSize: '12px'
})

const CustomMarker = ({active, position, setActiveMarker, title}) => {
  const pinIcon = active ? pinActive : pin
  return (
    <GoogleMarker
      position={position}
      icon={{ url: `${pinIcon}` }}
      onClick={() => setActiveMarker(position)}
      label={labelOptions(title)}
      title={title}
    />
  )
}

const Marker = ({ id, position, active, setActiveMarker, title }) => (
  <CustomMarker
    key={id}
    position={position}
    active={active}
    setActiveMarker={setActiveMarker}
    title={title}
  />
)

export default Marker
