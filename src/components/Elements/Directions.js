import React from 'react'
import { DirectionsRenderer } from 'react-google-maps'

import getDirectionsService from '../../services/getDirectionsService'

class Directions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      directions: null
    }
    this.getData = this.getData.bind(this)
  }

  async getData ({ origin, destination, modeOfTravel }) {
    if (origin && origin.lat && origin.lng && destination && destination.lat) {
      return getDirectionsService(origin, destination, modeOfTravel)
    }

    return null
  }

  async componentDidMount () {
    const { origin, destination, modeOfTravel } = this.props
    const directions = await this.getData({ origin, destination, modeOfTravel })
    this.setState({directions})
  }

  async componentWillReceiveProps (nextProps) {
    if (
      (this.props.origin !== nextProps.origin) ||
      (this.props.destination !== nextProps.destination) ||
      (this.props.modeOfTravel !== nextProps.modeOfTravel)
    ) {
      const { origin, destination, modeOfTravel } = nextProps
      const directions = await this.getData({ origin, destination, modeOfTravel })
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
export default Directions
