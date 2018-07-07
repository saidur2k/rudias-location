import React from 'react'
import PropTypes from 'prop-types'

import CustomCircle from './CustomCircle'
import DefaultCircle from './DefaultCircle'

const Circle = ({type, item}) => {
  if (type && type === 'custom') {
    return <CustomCircle lat={item.lat} lng={item.lng} />
  } else {
    return <DefaultCircle lat={item.lat} lng={item.lng} />
  }
}

Circle.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired
}

export default Circle
