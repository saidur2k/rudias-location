import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { SearchBox as GoogleSearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import './SearchBox.css'
class SearchBox extends Component {
  constructor (props) {
    super(props)
    this.textInput = React.createRef()
    this.onPlacesChanged = this.onPlacesChanged.bind(this)
  }

  onPlacesChanged () {
    const newPointsOfInterest = this.textInput.current.getPlaces()

    newPointsOfInterest.forEach(place => {
      this.props.addNewLocation({
        title: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        type: 'custom'
      })
    })

    this.props.setActiveMarker([...this.props.locations].pop())
  }

  render () {
    return (
      <GoogleSearchBox
        ref={this.textInput}
        controlPosition={window.google.maps.ControlPosition.TOP_RIGHT}
        onPlacesChanged={this.onPlacesChanged}
      >
        <input
          id='search-panel-box'
          type='text'
          placeholder='Search your property'
        />
      </GoogleSearchBox>
    )
  }
}

SearchBox.propTypes = {
  addNewLocation: PropTypes.func.isRequired,
  setActiveMarker: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  const { locations } = state
  return {
    locations
  }
}

export default connect(mapStateToProps)(SearchBox)

// export default SearchBox
