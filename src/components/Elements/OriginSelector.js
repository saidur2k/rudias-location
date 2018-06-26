import React from 'react'
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

export default OriginSelector
