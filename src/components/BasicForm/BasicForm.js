import React from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import noop from 'lodash/noop'

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

const StyledSubmitButton = styled.div`
  margin: 12px 0px 2px;
`

// To-Do: Refactor to make adding generic components like TextField and Submit button drag and drop
// For example: the text fields are still all not generic enough for a component like this

export function BasicForm({ title, data, handleSubmit = noop, validator = noop, initialValues = {} }) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <StyledPaper>
        <Typography component="h1" variant="h5" aria-label="Header">
          {title}
        </Typography>
        <Form
          onSubmit={handleSubmit}
          validate={validator}
          initialValues={initialValues}
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
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        id="phoneNumber"
                        disabled={true}
                      />
                    )}
                  </Field>
                </Grid>
              </Grid>
              <StyledSubmitButton>
                <Button type="submit" fullWidth variant="contained" color="secondary">
                  Delete Friend
                </Button>
              </StyledSubmitButton>
            </StyledForm>
          )}
        />
      </StyledPaper>
    </Container>
  )
}
