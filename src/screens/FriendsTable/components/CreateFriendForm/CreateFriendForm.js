import React from 'react'
import { Form, Field } from 'react-final-form'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import MuiPhoneNumber from 'material-ui-phone-number'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const StyledPaper = styled.div`
  margin-top: 160px;
  display: 'flex';
  flex-direction: 'column';
  align-items: 'center';
`

const StyledForm = styled.form`
  padding-top: 50px;
`

const StyledField = styled.div`
  margin: 20px;
  label {
    padding-right: 25px;
  }
`
const StyledSubmitButton = styled(Button)`
  margin: 25px 60px;
`

export function CreateFriendForm({ onSubmit }) {
  const handleSubmit = async (values) => {
    const phoneNumber = '+' + values.phoneNumber.replace(/[^\d]/g, '')
    onSubmit({ ...values, phoneNumber })
  }

  const validator = (values) => {
    const errors = {}
    if (!values.firstName) {
      errors.firstName = 'Required'
    }
    if (!values.lastName) {
      errors.lastName = 'Required'
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Required'
    }
    return errors
  }

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper>
        <Typography component="h1" variant="h5" aria-label="Header" align="center">
          Contact Info
        </Typography>
        <Form
          onSubmit={handleSubmit}
          validate={validator}
          render={({ handleSubmit, valid, submitting }) => (
            <StyledForm onSubmit={handleSubmit}>
              <StyledField>
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
              </StyledField>
              <StyledField>
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
              </StyledField>
              <StyledField>
                <Field name="phoneNumber">
                  {({ input, meta }) => (
                    <MuiPhoneNumber
                      variant="outlined"
                      defaultCountry="us"
                      required
                      fullWidth
                      name="phoneNumber"
                      label="Phone Number"
                      id="phoneNumber"
                      {...input}
                    />
                  )}
                </Field>
              </StyledField>
              <StyledSubmitButton type="submit" variant="contained" fullWidth color="primary">
                Add Friend!
              </StyledSubmitButton>
            </StyledForm>
          )}
        />
        <Box mt={5}>
          <Typography variant="caption" aria-label="footer" align="center" color="textSecondary">
            * Text Alfred 'Get friends birthdays' to have him ask your friends their birthdays for you!
          </Typography>
        </Box>
      </StyledPaper>
    </Container>
  )
}
