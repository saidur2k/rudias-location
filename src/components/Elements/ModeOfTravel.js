import React from 'react'
import PropTypes from 'prop-types'

import './ModeOfTravel.css'

const ModeOfTravel = ({onModeOfTravelChange}) => (
  <div id='floating-panel'>
    <b>Mode of Travel: </b>
    <select
      id='mode'
      onChange={(event) => onModeOfTravelChange(event.target.value)}>
      <option value='DRIVING'>Driving</option>
      <option value='WALKING'>Walking</option>
      <option value='BICYCLING'>Bicycling</option>
      <option value='TRANSIT'>Transit</option>
    </select>
  </div>
)

ModeOfTravel.propTypes = {
  onModeOfTravelChange: PropTypes.func.isRequired
}

export default ModeOfTravel
