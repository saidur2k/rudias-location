import React from 'react'
import PropTypes from 'prop-types'

import BaseCircle from './BaseCircle'

const CustomCircle = ({type, lat, lng}) => {
  return <BaseCircle color={'#00FF00'} lat={lat} lng={lng} />
}

CustomCircle.propTypes = {
  type: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

export default CustomCircle
