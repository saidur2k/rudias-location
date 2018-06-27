import React, { Component } from 'react'
import Map from './components/Map'
import './App.css'

import locations from './data/locations'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Map
          locations={locations}
          activeMarker={locations[6]}
          origin={locations[0]}
          zoom={12}
          modeOfTravel={'DRIVING'}
          multipleMarkers
        />
      </div>
    )
  }
}

export default App
