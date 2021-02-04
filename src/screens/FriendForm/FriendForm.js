import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import { ToastProvider, useToasts } from 'react-toast-notifications'

import { Form, Field } from 'react-final-form'
import { useMutation, useQuery } from 'react-query'
import { QUERIES } from '../../api/queries'
import { useParams } from 'react-router-dom'
import { getFriend, updateFriend } from '../api/friends'

const StyledPaper = styled.div`
  margin-top: 160px;
  display: 'flex';
  flex-direction: 'column';
  align-items: 'center';
`

const StyledForm = styled.form`
  width: 100%;
  margin-top: 24px;
`

const StyledSubmitButton = styled(Button)`
  margin: 24px 0px 2px;
`

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://www.alfred-penny.com/">
        Alfred
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const BaseFriendForm = () => {
  const { clientId, friendId } = useParams()
  const { addToast } = useToasts()

  const getQueryKey = [QUERIES.FRIEND.SINGLE, { clientId, friendId }]
  const { data: friend } = useQuery(getQueryKey, getFriend)

  const [updateFriendsQuery] = useMutation(updateFriend, {
    onError() {
      addToast('Failed to update your info', { appearance: 'error' })
    },
    onSuccess(resp) {
      addToast('Successfully updated your info!', { appearance: 'success' })
      window.heap.track('Friend Updated Themselves', { friend: { ...resp.data } })
    },
  })

  const handleSubmit = async (values) => {
    const { firstName, lastName, birthday, phoneNumber } = values
    await updateFriendsQuery({ friendId, clientId, body: { firstName, lastName, birthday, phoneNumber } })
  }

  const validator = (values) => {
    const errors = {}
    if (!values.firstName) {
      errors.firstName = 'Required'
    }
    if (!values.lastName) {
      errors.lastName = 'Required'
    }
    if (!values.birthday) {
      errors.birthday = 'Required'
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Required'
    }
    return errors
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <StyledPaper>
        <Typography component="h1" variant="h5" aria-label="Header">
          Hey {friend?.data.firstName} please update your info below!
        </Typography>
        <Form
          onSubmit={handleSubmit}
          validate={validator}
          initialValues={{
            firstName: friend?.data.firstName,
            lastName: friend?.data.lastName,
            phoneNumber: friend?.data.phoneNumber,
          }}
          render={({ handleSubmit, valid, submitting }) => (
            <StyledForm onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field name="firstName">
                    {({ input, meta }) => (
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        error={meta.error && meta.touched}
                        {...input}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="lastName">
                    {({ input, meta }) => (
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        error={meta.error && meta.touched}
                        {...input}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="birthday">
                    {({ input, meta }) => (
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="birthday"
                        label="Birthday"
                        name="birthday"
                        autoComplete="birthday"
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={meta.error && meta.touched}
                        {...input}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="phoneNumber">
                    {() => (
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        id="phoneNumber"
                        disabled={true}
                        value={friend?.data.phoneNumber || ''}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <StyledSubmitButton type="submit" fullWidth variant="contained" color="primary">
                Save your info
              </StyledSubmitButton>
            </StyledForm>
          )}
        />
      </StyledPaper>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export function FriendForm() {
  return (
    <ToastProvider>
      <BaseFriendForm />
    </ToastProvider>
  )
}
