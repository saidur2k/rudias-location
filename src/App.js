import React, { Component } from 'react'
import Map from './components/Map'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Map
          zoom={12}
          multipleMarkers
        />
      </div>
    )
  }
}

export default App
