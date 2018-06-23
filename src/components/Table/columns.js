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

export default columns
