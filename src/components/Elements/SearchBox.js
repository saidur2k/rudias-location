import React from 'react'
import PropTypes from 'prop-types'

import { SearchBox as GoogleSearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import './SearchBox.css'

const SearchBox = ({ onSearchBoxMounted, bounds, onPlacesChanged }) => {
  return (
    <GoogleSearchBox
      ref={onSearchBoxMounted}
      controlPosition={window.google.maps.ControlPosition.TOP_RIGHT}
      onPlacesChanged={onPlacesChanged}
    >
      <input
        id='search-panel-box'
        type='text'
        placeholder='Search your property'
      />
    </GoogleSearchBox>
  )
}

SearchBox.propTypes = {
  onSearchBoxMounted: PropTypes.func.isRequired,
  onPlacesChanged: PropTypes.func.isRequired
}
export default SearchBox
