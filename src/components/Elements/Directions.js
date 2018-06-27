import React from 'react'
import PropTypes from 'prop-types'
import { DirectionsRenderer } from 'react-google-maps'

import getDirectionsService from '../../services/getDirectionsService'

class Directions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      directions: null
    }
  }

  async componentDidMount () {
    const { origin, destination, modeOfTravel } = this.props
    const directions = await getDirectionsService(origin, destination, modeOfTravel)
    this.setState({directions})
  }

  async componentWillReceiveProps (nextProps) {
    if (
      (this.props.origin !== nextProps.origin) ||
      (this.props.destination !== nextProps.destination) ||
      (this.props.modeOfTravel !== nextProps.modeOfTravel)
    ) {
      const { origin, destination, modeOfTravel } = nextProps
      const directions = await getDirectionsService(origin, destination, modeOfTravel)
      this.setState({directions})
    }
  }

  render () {
    if (this.state.directions) {
      return <DirectionsRenderer directions={this.state.directions} />
    } else {
      return <div id='no-directions' />
    }
  }
}

Directions.propTypes = {
  origin: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  destination: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  modeOfTravel: PropTypes.oneOf(['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT']).isRequired
}

export default Directions
