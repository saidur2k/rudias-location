import React, { Component } from 'react'

import OriginSelector from './Elements/OriginSelector'
import LocationsGoogleMap from './LocationsGoogleMap'
import MultipleMarkersWithCircles from './Groupings/MultipleMarkersWithCircles'
import ModeOfTravel from './Elements/ModeOfTravel'
import Table from './Elements/Table'

import Directions from './Elements/Directions'

import FitMarkersOnMap from '../lib/FitMarkersOnMap'
import GoogleMapsConfig from '../lib/GoogleMapsConfig'
import setCenter from '../lib/setCenter'

const DEFAULT_ZOOM = 12

class PropertyMap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeMarker: {},
      zoom: DEFAULT_ZOOM,
      modeOfTravel: 'DRIVING',
      origin: props.locations[0],
      center: setCenter(props.locations),
      locations: props.locations
    }

    this.map = React.createRef()
    this.searchBox = React.createRef()

    // we fit all markers in the map just when loading it, after that it's user's choice what to fit in his viewport
    this.fitMap = true
    this.setActiveMarker = this.setActiveMarker.bind(this)
    this.shouldMarkerBeActive = this.shouldMarkerBeActive.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.onModeOfTravelChange = this.onModeOfTravelChange.bind(this)
    this.onPlacesChanged = this.onPlacesChanged.bind(this)
    this.onMapMounted = this.onMapMounted.bind(this)
    this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this)
    this.handleOriginSelection = this.handleOriginSelection.bind(this)
  }

  onMapMounted (ref) {
    this.map = ref
  }

  onSearchBoxMounted (ref) {
    this.searchBox = ref
  }

  onPlacesChanged () {
    const places = this.searchBox.getPlaces()
    const newMarkers = []

    places.forEach((place, index) => {
      return newMarkers.push({
        title: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        type: 'custom',
        id: this.state.locations.length + (index + 1)
      })
    })

    this.setState(previousState => {
      const locations = previousState.locations.concat(newMarkers)
      return {
        center: setCenter(locations),
        locations: locations,
        activeMarker: newMarkers[0]
      }
    })
  }

  setActiveMarker (clickedMarker) {
    this.fitMap = true

    this.state.locations.filter(item => {
      if (item.lat === clickedMarker.lat && item.lng === clickedMarker.lng) {
        this.setState({
          activeMarker: item
        })
      }
    })
  }

  shouldMarkerBeActive (marker) {
    return (
      this.state.activeMarker.lat === marker.lat &&
      this.state.activeMarker.lng === marker.lng
    )
  }

  zoomIn (newZoom) {
    this.setState({ zoom: newZoom })
  }

  onModeOfTravelChange (method) {
    this.setState({
      modeOfTravel: method
    })
  }

  handleOriginSelection (locationId) {
    this.state.locations.filter(item => {
      if (parseFloat(item.id) === parseFloat(locationId)) {
        this.setState({ origin: item })
      }
    })
  }

  render () {
    const { multipleMarkers } = this.props
    const {
      modeOfTravel,
      center,
      zoom,
      locations,
      activeMarker,
      origin
    } = this.state
    const {
      googleMapURL,
      containerElement,
      mapElement,
      loadingElement
    } = GoogleMapsConfig
    // this default center is used only when the property is a single point
    return (
      <div>
        <OriginSelector
          locations={locations}
          handleOriginSelection={this.handleOriginSelection}
        />

        <ModeOfTravel
          value={modeOfTravel}
          onModeOfTravelChange={this.onModeOfTravelChange}
        />

        <LocationsGoogleMap
          googleMapURL={googleMapURL}
          containerElement={containerElement}
          mapElement={mapElement}
          loadingElement={loadingElement}
          defaultCenter={center}
          zoom={zoom}
          onMapLoad={this.onMapMounted}
          onPlacesChanged={this.onPlacesChanged}
          onSearchBoxMounted={this.onSearchBoxMounted}
        >
          <button
            onClick={map =>
              FitMarkersOnMap(
                this.map,
                locations,
                multipleMarkers,
                this.fitMap,
                this.zoomIn
              )
            }
          >
            Fit Map
          </button>

          <Directions
            origin={origin}
            destination={activeMarker}
            modeOfTravel={modeOfTravel}
          />

          <MultipleMarkersWithCircles
            locations={locations}
            setActiveMarker={this.setActiveMarker}
            shouldMarkerBeActive={this.shouldMarkerBeActive}
          />

          <Table
            origin={activeMarker}
            modeOfTravel={modeOfTravel}
            locations={locations}
          />
        </LocationsGoogleMap>
      </div>
    )
  }
}

export default PropertyMap
