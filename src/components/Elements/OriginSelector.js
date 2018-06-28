import React from 'react'
import PropTypes from 'prop-types'

import './ModeOfTravel.css'

const OriginSelector = ({ locations, setOriginMarker }) => (
  <div id='origin-floating-panel'>
    <b>Select Origin: </b>
    <select
      id='origin'
      onChange={event => {
        const item = locations.filter(l => {
          return l.id === parseInt(event.target.value, 10)
        })

        setOriginMarker(item[0])
      }}
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
  setOriginMarker: PropTypes.func.isRequired
}

export default OriginSelector
