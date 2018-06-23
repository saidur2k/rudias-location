import 'react-table/react-table.css'

import hasData from './hasData'
import NoData from './NoData'
import FormattedTableWithData from './FormattedTableWithData'

import './Table.css'

const Table = ({ data, from, modeOfTravel }) => {
  const showTable = hasData(data)
  return showTable
    ? FormattedTableWithData({
      from,
      data,
      modeOfTravel
    })
    : NoData()
}

export default Table
