import React from 'react'
import PropTypes from 'prop-types'

import './ModeOfTravel.css'

const OriginSelector = ({ locations, handleOriginSelection }) => (
  <div id='origin-floating-panel'>
    <b>Select Origin: </b>
    <select
      id='origin'
      onChange={event => handleOriginSelection(event.target.value)}
    >
      {locations.map(item => (
        <option key={item.id} value={item.id}>
          {item.title}
        </option>
      ))}
    </select>
  </div>
)

OriginSelector.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  handleOriginSelection: PropTypes.func.isRequired
}

export default OriginSelector
