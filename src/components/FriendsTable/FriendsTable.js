import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import { IconButton } from '@material-ui/core'
// Icons
import AddCircle from '@material-ui/icons/AddCircle'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import DoneIcon from '@material-ui/icons/DoneAllTwoTone'
import EditIcon from '@material-ui/icons/EditOutlined'
import RevertIcon from '@material-ui/icons/NotInterestedOutlined'
import { v4 as uuidv4 } from 'uuid'
import { createFriends, getFriends } from '../../api/friends'
import { useMutation, useQuery } from 'react-query'
import { QUERIES } from '../../api/queries'
import { useParams } from 'react-router-dom'
import { ToastProvider, useToasts } from 'react-toast-notifications'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}))

const createData = (firstName, lastName, birthday, phoneNumber) => ({
  id: uuidv4(),
  firstName,
  lastName,
  birthday,
  phoneNumber,
  isEditMode: false,
})

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles()
  const { isEditMode } = row
  const attributeToLabel = {
    firstName: 'First Name',
    lastName: 'Last Name',
    birthday: 'MM-DD-YYYY',
    phoneNumber: '+12035724630',
  }
  return (
    <TableCell align="left" className={classes.tableCell} aria-label={`${name}-cell`}>
      {isEditMode ? (
        <TextField
          value={row[name]}
          name={name}
          onChange={(e) => onChange(e, row)}
          className={classes.input}
          label={attributeToLabel[name]}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  )
}

const CustomTable = () => {
  const { addToast } = useToasts()
  const { clientId } = useParams()
  const [rows, setRows] = useState([createData('', '', '', '')])
  const [previous, setPrevious] = useState({})
  const classes = useStyles()

  const getQueryKey = [QUERIES.FRIENDS.ALL, clientId]
  const { data: friendsData, isSuccess: isGetFriendsSuccess, isLoading: isGetFriendsLoading } = useQuery(
    getQueryKey,
    getFriends,
  )

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
    if (friendsData?.data) {
      let allFriendRows = []
      friendsData.data.forEach((friend) => {
        const { firstName, lastName, birthday, phoneNumber } = friend
        const date = new Date(birthday)
        const month = date.getMonth()
        const year = date.getFullYear()
        const day = date.getDay()

        allFriendRows.push(createData(firstName, lastName, birthday, phoneNumber))
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

  const onDelete = (id) => {
    const newRows = rows
      .map((row) => {
        return row.id !== id ? row : undefined
      })
      .filter(Boolean)
    setRows(newRows)
  }

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Birthday</TableCell>
              <TableCell align="left">Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id} aria-label={`row-${index}`}>
                <TableCell className={classes.selectTableCell}>
                  {row.isEditMode ? (
                    <>
                      <IconButton aria-label="done-button" onClick={() => onToggleEditMode(row.id)}>
                        <DoneIcon />
                      </IconButton>
                      <IconButton aria-label="delete-button" onClick={() => onDelete(row.id)}>
                        <RevertIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton aria-label="edit-button" onClick={() => onToggleEditMode(row.id)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
                <CustomTableCell {...{ row, name: 'firstName', onChange }} />
                <CustomTableCell {...{ row, name: 'lastName', onChange }} />
                <CustomTableCell {...{ row, name: 'birthday', onChange }} />
                <CustomTableCell {...{ row, name: 'phoneNumber', onChange }} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Grid container direction="row-reverse" justify="flex-start" alignItems="center">
        <IconButton aria-label="upload-button" onClick={() => onUploadClick()}>
          <CloudUploadIcon fontSize="large" />
        </IconButton>
        <IconButton aria-label="add-row-button" onClick={() => addRow()}>
          <AddCircle fontSize="large" />
        </IconButton>
      </Grid>
    </div>
  )
}

export const FriendsTable = () => (
  <ToastProvider>
    <CustomTable />
  </ToastProvider>
)
