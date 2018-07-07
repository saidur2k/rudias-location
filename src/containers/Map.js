import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import OriginSelector from '../components/OriginSelector'
import LocationsGoogleMap from './LocationsGoogleMap'
import MultipleMarkersWithCircles from './MultipleMarkersWithCircles'
import ModeOfTravel from '../components/ModeOfTravel'
import Table from '../components/Table'

import Directions from '../components/Direction'

import FitMarkersOnMap from '../lib/FitMarkersOnMap'
import GoogleMapsConfig from '../lib/GoogleMapsConfig'
import setCenter from '../lib/setCenter'

import {
  selectModeOfTravel
} from '../components/ModeOfTravel/ModeOfTravelActions'

import {
  addLocation
} from '../components/SearchBox/SearchBoxActions'

import {
  setActiveMarker,
  setOriginMarker
} from '../components/Marker/MarkerActions'

class PropertyMap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      zoom: props.zoom
    }

    this.map = React.createRef()
    this.searchBox = React.createRef()

    // we fit all markers in the map just when loading it, after that it's user's choice what to fit in his viewport
    this.fitMap = true
    this.zoomIn = this.zoomIn.bind(this)
    this.onMapMounted = this.onMapMounted.bind(this)
  }

  onMapMounted (ref) {
    this.map = ref
  }

  zoomIn (newZoom) {
    this.setState({ zoom: newZoom })
  }

  render () {
    const {
      onModeOfTravelChange,
      modeOfTravel,
      multipleMarkers,
      addNewLocation,
      locations,
      activeMarker,
      setActiveMarker,
      originMarker,
      setOriginMarker
    } = this.props
    const { zoom } = this.state
    const {
      googleMapURL,
      containerElement,
      mapElement,
      loadingElement
    } = GoogleMapsConfig
    return (
      <div>
        <OriginSelector
          locations={locations}
          setOriginMarker={setOriginMarker}
        />

        <ModeOfTravel onModeOfTravelChange={onModeOfTravelChange} />

        <LocationsGoogleMap
          googleMapURL={googleMapURL}
          containerElement={containerElement}
          mapElement={mapElement}
          loadingElement={loadingElement}
          defaultCenter={setCenter(locations)}
          zoom={zoom}
          onMapLoad={this.onMapMounted}
          addNewLocation={addNewLocation}
          setActiveMarker={setActiveMarker}
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
            origin={originMarker}
            destination={activeMarker}
            modeOfTravel={modeOfTravel}
          />

          <MultipleMarkersWithCircles
            locations={locations}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
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

PropertyMap.propTypes = {
  originMarker: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired,
  modeOfTravel: PropTypes.oneOf(['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'])
    .isRequired,
  zoom: PropTypes.number.isRequired
}

function mapStateToProps (state) {
  const { modeOfTravel, locations, activeMarker, originMarker } = state
  return {
    modeOfTravel,
    locations,
    activeMarker,
    originMarker
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onModeOfTravelChange: method => {
      dispatch(selectModeOfTravel(method))
    },
    addNewLocation: async method => {
      dispatch(addLocation(method))
    },
    setActiveMarker: method => {
      dispatch(setActiveMarker(method))
    },
    setOriginMarker: method => {
      dispatch(setOriginMarker(method))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyMap)
