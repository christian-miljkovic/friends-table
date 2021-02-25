import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { CustomTableCell } from './components/CustomTableCell/CustomTableCell'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { FriendModal } from './components/FriendModal'

// Icons
import { v4 as uuidv4 } from 'uuid'
import { createFriends, getAllFriends } from '../api/friends'
import { useMutation, useQuery } from 'react-query'
import { QUERIES } from '../../api/queries'
import { useParams } from 'react-router-dom'
import { ToastProvider, useToasts } from 'react-toast-notifications'
import isEmpty from 'lodash/isEmpty'
import isUndefined from 'lodash/isUndefined'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { useEffectOnce } from '../../util/hooks'

const StyledSubmitButton = styled.div`
  margin: 24px 0px 2px;
  max-width: 50%;
  margin-left: 85px;
`

const StyledPaper = styled.div`
  margin-top: 50px;
  display: 'flex';
  flex-direction: 'column';
  align-items: 'center';
`

const StyledTable = styled(Table)`
  width: 375px;
`

const StyledTableCell = styled(TableCell)`
  width: 50%;
  padding: 16px 16px;
`

const StyledTableHeader = styled(TableHead)`
  display: flex;
  width: 375px;
`

const createData = ({ id, firstName = '', lastName = '', birthday = '', phoneNumber = '' } = {}) => ({
  id,
  firstName,
  lastName,
  birthday,
  phoneNumber,
  isEditMode: false,
})

const BaseFriendsTable = () => {
  const { addToast } = useToasts()
  const { clientId } = useParams()
  const [rows, setRows] = useState([createData()])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [friend, setFriend] = useState({})

  const getQueryKey = [QUERIES.FRIEND.ALL, clientId]
  const { data: friendsData } = useQuery(getQueryKey, getAllFriends)

  const [createFriendsQuery] = useMutation(createFriends, {
    onError() {
      addToast('Failed to add friends', { appearance: 'error' })
    },
    onSuccess(resp) {
      addToast('Successfully added friend!', { appearance: 'success' })
      resp.data.forEach((friend) => {
        const newRow = rows.concat(createData({ ...friend }))
        setRows(newRow)
        window.heap.track('Friend Created', { friend: { ...friend } })
      })
    },
  })

  useEffectOnce(() => {
    window.heap.loaded && window.heap.identify(clientId)
  })

  useEffect(() => {
    const friends = friendsData?.data
    if (!isUndefined(friends) && !isEmpty(friends)) {
      let allFriendRows = []
      friendsData.data.forEach((friend) => {
        const { birthday } = friend
        const formattedBirthday = birthday ? dayjs(birthday).format('MM-DD-YYYY') : ''
        allFriendRows.push(createData({ ...friend, birthday: formattedBirthday }))
      })
      setRows(allFriendRows)
    }
  }, [friendsData])

  const onSubmit = async (values) => {
    console.debug({ values })
    await createFriendsQuery({ clientId, body: [values] })
    setIsModalOpen(false)
  }

  function handleClose() {
    setIsModalOpen(false)
  }

  function handleRowClick(values) {
    setFriend(values)
    setIsModalOpen(true)
  }

  return (
    <>
      <StyledPaper>
        <Typography component="h1" variant="h5" aria-label="Header" align="center">
          Contacts
        </Typography>
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
              <TableRow
                key={row.id}
                aria-label={`row-${index}`}
                onClick={() => {
                  handleRowClick(row)
                }}
              >
                <CustomTableCell {...{ row, name: 'firstName' }} />
                <CustomTableCell {...{ row, name: 'lastName' }} />
                <CustomTableCell {...{ row, name: 'birthday' }} />
                <CustomTableCell {...{ row, name: 'phoneNumber' }} />
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
        <StyledSubmitButton>
          <Button type="submit" variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
            Add another friend
          </Button>
        </StyledSubmitButton>
      </StyledPaper>
      <FriendModal isOpen={isModalOpen} onSubmit={onSubmit} handleClose={handleClose} friend={friend} />
    </>
  )
}

export function FriendsTable() {
  return (
    <ToastProvider>
      <BaseFriendsTable />
    </ToastProvider>
  )
}
