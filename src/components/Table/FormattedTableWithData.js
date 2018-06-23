import React from 'react'
import ReactTable from 'react-table'

import header from './header'
import columns from './columns'

const FormattedTableWithData = ({ from, data, modeOfTravel }) => (
  <div className='matrix-table'>
    {header({ modeOfTravel, from })}
    <ReactTable data={data} columns={columns} showPagination={false} />
  </div>
)

export default FormattedTableWithData
