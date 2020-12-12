import React from 'react'
import { CustomTableCell } from './CustomTableCell'
import TableRow from '@material-ui/core/TableRow'

export const ClickableRow = ({ index, row }) => {
  return (
    <div>
      <TableRow key={row.id} aria-label={`row-${index}`}>
        <CustomTableCell {...{ row, name: 'firstName' }} />
        <CustomTableCell {...{ row, name: 'lastName' }} />
        <CustomTableCell {...{ row, name: 'birthday' }} />
        <CustomTableCell {...{ row, name: 'phoneNumber' }} />
      </TableRow>
    </div>
  )
}
