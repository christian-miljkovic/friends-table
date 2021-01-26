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

import { useQuery } from 'react-query'
import { QUERIES } from '../../api/queries'
import { useParams } from 'react-router-dom'
import { getFriend } from '../api/friends'

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

export function FriendForm() {
  const { clientId, friendId } = useParams()

  const getQueryKey = [QUERIES.FRIEND.SINGLE, { clientId, friendId }]
  const { data: friend } = useQuery(getQueryKey, getFriend)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <StyledPaper>
        <Typography component="h1" variant="h5">
          Hey {friend?.data.firstName} please update your info below!
        </Typography>
        <StyledForm>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={friend?.data.firstName || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={friend?.data.lastName || ''}
              />
            </Grid>
            <Grid item xs={12}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                id="phoneNUmber"
                disabled={true}
                value={friend?.data.phoneNumber || ''}
              />
            </Grid>
          </Grid>
          <StyledSubmitButton type="submit" fullWidth variant="contained" color="primary">
            Save
          </StyledSubmitButton>
        </StyledForm>
      </StyledPaper>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
