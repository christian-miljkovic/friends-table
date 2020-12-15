import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import styled from 'styled-components'

const StyledTableCell = styled(TableCell)`
  width: 130;
  height: 40;
`

export function CustomTableCell({ row, name }) {
  return (
    <StyledTableCell align="left" aria-label="table-cell">
      {row[name]}
    </StyledTableCell>
  )
}
