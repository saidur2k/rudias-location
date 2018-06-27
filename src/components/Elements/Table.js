import React from 'react'
import ReactTable from 'react-table'
import PropTypes from 'prop-types'

import getDistanceService from '../../services/getDistanceService'

import 'react-table/react-table.css'
import './Table.css'

const columns = [
  {
    id: 'stationName',
    Header: 'To Station',
    accessor: 'stationName'
  },
  {
    Header: 'Distance',
    accessor: 'distance.value',
    Cell: row => row.original.distance ? row.original.distance.text : 'Unavailable'
  },
  {
    Header: 'Duration',
    accessor: 'duration.value',
    Cell: row => row.original.duration ? row.original.duration.text : 'Unavailable'
  },
  {
    Header: 'Address',
    accessor: 'title'
  }
]

class Table extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  async componentDidMount () {
    const { origin, locations, modeOfTravel } = this.props
    const data = await getDistanceService(origin, locations, modeOfTravel)
    this.setState({ data })
  }

  async componentWillReceiveProps (nextProps) {
    if (
      this.props.origin !== nextProps.origin ||
      this.props.locations !== nextProps.locations ||
      this.props.modeOfTravel !== nextProps.modeOfTravel
    ) {
      const { origin, locations, modeOfTravel } = nextProps
      const data = await getDistanceService(origin, locations, modeOfTravel)
      this.setState({ data })
    }
  }

  render () {
    const { modeOfTravel, origin } = this.props
    if (this.state.data) {
      return (
        <div>
          <h1>
            {modeOfTravel} Distance Matrix from {origin.title}
          </h1>
          <ReactTable
            data={this.state.data}
            columns={columns}
            showPagination={false}
          />
        </div>
      )
    } else {
      return (
        <div className='matrix-table'>
          <p>No data</p>
        </div>
      )
    }
  }
}

Table.propTypes = {
  origin: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  }).isRequired,
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired).isRequired,
  modeOfTravel: PropTypes.oneOf(['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT']).isRequired
}

export default Table
