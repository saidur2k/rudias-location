import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DirectionsRenderer } from 'react-google-maps'

import { directionId } from './DirectionHelper'
import { fetchDirectionsIfNeeded } from './DirectionActions'

class Directions extends React.Component {
  componentDidMount () {
    const { dispatch, origin, destination, modeOfTravel } = this.props
    dispatch(
      fetchDirectionsIfNeeded({
        originMarker: origin,
        activeMarker: destination,
        modeOfTravel
      })
    )
  }

  componentWillReceiveProps (nextProps) {
    const { dispatch, origin, destination, modeOfTravel } = nextProps
    dispatch(
      fetchDirectionsIfNeeded({
        originMarker: origin,
        activeMarker: destination,
        modeOfTravel
      })
    )
  }

  render () {
    const { directions } = this.props
    if (directions && directions[0]) {
      return <DirectionsRenderer directions={directions[0]} />
    } else {
      return <div id='no-directions' />
    }
  }
}

Directions.propTypes = {
  origin: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    id: PropTypes.number
  }),
  destination: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    id: PropTypes.number
  }),
  modeOfTravel: PropTypes.oneOf(['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'])
    .isRequired
}

function mapStateToProps (state) {
  const {
    originMarker,
    activeMarker,
    modeOfTravel,
    directionsByOriginDestination
  } = state
  const id = directionId({modeOfTravel, originMarker, activeMarker})

  const {
    isFetching,
    lastUpdated,
    items: directions
  } = directionsByOriginDestination[id] || {
    isFetching: true,
    items: []
  }
  return {
    origin: originMarker,
    destination: activeMarker,
    modeOfTravel: modeOfTravel,
    isFetching,
    lastUpdated,
    directions
  }
}

export default connect(mapStateToProps)(Directions)
