import React, { Component } from 'react'

import LocationsGoogleMap from './LocationsGoogleMap'
import MultipleMarkersWithCircles from './Groupings/MultipleMarkersWithCircles'
import ModeOfTravel from './Elements/ModeOfTravel'
import Table from './Table/'

import getDirectionAndDistance from '../lib/getDirectionAndDistance'
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
      directions: null,
      modeOfTravel: 'DRIVING',
      origin: props.locations[0],
      distance: null,
      center: setCenter(props.locations),
      locations: props.locations
    }

    this.searchBox = React.createRef()

    // we fit all markers in the map just when loading it, after that it's user's choice what to fit in his viewport
    this.fitMap = true
    this.setActiveMarker = this.setActiveMarker.bind(this)
    this.shouldMarkerBeActive = this.shouldMarkerBeActive.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.onModeOfTravelChange = this.onModeOfTravelChange.bind(this)
    this.onPlacesChanged = this.onPlacesChanged.bind(this)
    this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this)
  }

  onSearchBoxMounted (ref) {
    this.searchBox = ref
  }

  onPlacesChanged () {
    const places = this.searchBox.getPlaces()
    const newMarkers = []

    places.forEach((place, index) => {
      return newMarkers.push(
        {
          title: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          type: 'custom',
          id: this.state.locations.length + (index + 1)
        }
      )
    })

    this.setState((previousState) => {
      const locations = previousState.locations.concat(newMarkers)
      return {
        center: setCenter(locations),
        locations: locations,
        origin: newMarkers[0]
      }
    })

    this.setActiveMarker(newMarkers[0])
  }

  setActiveMarker (clickedMarker) {
    this.fitMap = true

    this.state.locations.filter(async item => {
      if (
        item.lat === clickedMarker.lat &&
        item.lng === clickedMarker.lng
      ) {
        const directionAndDistance = await getDirectionAndDistance({
          origin: this.state.origin,
          destination: item,
          destinations: this.state.locations,
          mode: this.state.modeOfTravel
        })

        this.setState({
          activeMarker: item,
          orgin: item,
          directions: directionAndDistance.direction,
          distance: directionAndDistance.distance
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

  async onModeOfTravelChange (method) {
    const directionAndDistance = await getDirectionAndDistance({
      origin: this.state.origin,
      destination: this.state.activeMarker,
      destinations: this.state.locations,
      mode: method
    })

    this.setState({
      modeOfTravel: method,
      directions: directionAndDistance.direction,
      distance: directionAndDistance.distance
    })
  }

  render () {
    const { multipleMarkers } = this.props
    const {
      modeOfTravel,
      center,
      zoom,
      directions,
      distance,
      locations,
      activeMarker
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
          directions={directions}
          onMapLoad={map => {
            FitMarkersOnMap(
              map,
              locations,
              multipleMarkers,
              this.fitMap,
              this.zoomIn
            )
          }}
          onPlacesChanged={this.onPlacesChanged}
          onSearchBoxMounted={this.onSearchBoxMounted}
        >
          <MultipleMarkersWithCircles
            locations={locations}
            setActiveMarker={this.setActiveMarker}
            shouldMarkerBeActive={this.shouldMarkerBeActive}
          />
        </LocationsGoogleMap>

        <Table from={activeMarker} modeOfTravel={modeOfTravel} data={distance} />
      </div>
    )
  }
}

export default PropertyMap
