import React from 'react'

const header = ({ modeOfTravel, from }) => (
  <h1>
    {modeOfTravel} Distance Matrix from {from.title}
  </h1>
)

export default header
