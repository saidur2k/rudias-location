import React from 'react'
import PropTypes from 'prop-types'

import BaseCircle from './BaseCircle'

const DefaultCircle = ({type, lat, lng}) => {
  return <BaseCircle color={'#e8ffa1'} lat={lat} lng={lng} />
}

DefaultCircle.propTypes = {
  type: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

export default DefaultCircle
