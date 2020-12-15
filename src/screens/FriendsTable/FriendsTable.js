import React, { useEffect, useState } from 'react'
import { CustomTableCell } from './components/CustomTableCell'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { IconButton } from '@material-ui/core'

// Icons
import AddCircle from '@material-ui/icons/AddCircle'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { v4 as uuidv4 } from 'uuid'
import { createFriends, getFriends } from './api/friends'
import { useMutation, useQuery } from 'react-query'
import { QUERIES } from '../../api/queries'
import { useParams } from 'react-router-dom'
import { ToastProvider, useToasts } from 'react-toast-notifications'
import isEmpty from 'lodash/isEmpty'
import isUndefined from 'lodash/isUndefined'
import dayjs from 'dayjs'
import styled from 'styled-components'

const StyledPaper = styled(Paper)`
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) {
    width: 375px;
  }
  width: 375px;
  margin-top: 10px;
`

const StyledTable = styled(Table)`
  width: 375px;
`

const StyledTableCell = styled(TableCell)`
  width: 100%;
`

const StyledTableHeader = styled(TableHead)`
  display: flex;
  width: 375px;
`

const createData = (firstName, lastName, birthday, phoneNumber) => ({
  id: uuidv4(),
  firstName,
  lastName,
  birthday,
  phoneNumber,
  isEditMode: false,
})

const CustomTable = () => {
  const { addToast } = useToasts()
  const { clientId } = useParams()
  const [rows, setRows] = useState([createData('', '', '', '')])
  const [previous, setPrevious] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getQueryKey = [QUERIES.FRIENDS.ALL, clientId]
  const { data: friendsData, isLoading: isGetFriendsLoading } = useQuery(getQueryKey, getFriends)

  const [createFriendsQuery] = useMutation(createFriends, {
    onError() {
      addToast('Failed to add friends', { appearance: 'error' })
    },
    onSuccess(data) {
      addToast('Successfully added friends', { appearance: 'success' })
      const { firstName, lastName, birthday, phoneNumber } = data
      const newRows = rows.concat(createData(firstName, lastName, birthday, phoneNumber))
      setRows(newRows)
    },
  })

  useEffect(() => {
    const friends = friendsData?.data
    if (!isUndefined(friends) && !isEmpty(friends)) {
      let allFriendRows = []
      friendsData.data.forEach((friend) => {
        const { firstName, lastName, birthday, phoneNumber } = friend
        const formattedBirthday = dayjs(birthday).format('MM-DD-YYYY')
        allFriendRows.push(createData(firstName, lastName, formattedBirthday, phoneNumber))
      })
      setRows(allFriendRows)
    }
  }, [friendsData])

  const onToggleEditMode = (id) => {
    setRows((_state) => {
      return rows.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode }
        }
        return row
      })
    })
  }

  const onUploadClick = async () => {
    await createFriendsQuery({ clientId, body: rows })
  }

  const addRow = () => {
    const lastRow = rows[rows.length - 1]
    if (!isRowEmpty(lastRow)) {
      const newEmptyRow = createData('', '', '', '')
      const newRows = rows.concat(newEmptyRow)
      setRows(newRows)
    }
  }

  const isRowEmpty = (row) => {
    return !(row.firstName && row.lastName && row.birthday && row.phoneNumber)
  }

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious((state) => ({ ...state, [row.id]: row }))
    }
    const value = e.target.value
    const name = e.target.name
    const { id } = row
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value }
      }
      return row
    })
    setRows(newRows)
  }

  return (
    <>
      <StyledPaper>
        <StyledTable aria-label="caption table">
          <StyledTableHeader>
            <TableRow>
              <StyledTableCell align="left">First Name</StyledTableCell>
              <StyledTableCell align="left">Last Name</StyledTableCell>
              <StyledTableCell align="left">Birthday</StyledTableCell>
              <StyledTableCell align="left">Phone Number</StyledTableCell>
            </TableRow>
          </StyledTableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id} aria-label={`row-${index}`} onClick={() => console.debug('hello')}>
                <CustomTableCell {...{ row, name: 'firstName' }} />
                <CustomTableCell {...{ row, name: 'lastName' }} />
                <CustomTableCell {...{ row, name: 'birthday' }} />
                <CustomTableCell {...{ row, name: 'phoneNumber' }} />
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledPaper>
      <Grid container direction="row-reverse" justify="flex-start" alignItems="center">
        <IconButton aria-label="upload-button" onClick={() => onUploadClick()}>
          <CloudUploadIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="add-row-button" onClick={() => addRow()}>
          <AddCircle fontSize="large" />
        </IconButton>
      </Grid>
    </>
  )
}

export const FriendsTable = () => {
  return (
    <ToastProvider>
      <CustomTable />
    </ToastProvider>
  )
}
