import React from 'react'
import { SearchBox as GoogleSearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import './SearchBox.css'

const SearchBox = ({ onSearchBoxMounted, bounds, onPlacesChanged }) => {
  return (
    <GoogleSearchBox
      ref={onSearchBoxMounted}
      bounds={bounds}
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

export default SearchBox
