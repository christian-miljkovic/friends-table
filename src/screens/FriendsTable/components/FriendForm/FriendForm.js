import React from 'react'
import { Form, Field } from 'react-final-form'
import MuiPhoneNumber from 'material-ui-phone-number'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

const StyledForm = styled.form`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const StyledField = styled.div`
  margin: 10px;
  label {
    padding-right: 25px;
  }
`
const StyledButton = styled.button`
  background-color: #00c804;
  border-radius: 4px;
  outline: none;
  width: 50%;
  margin: auto;
  padding: 10px;
  color: white;
  margin-top: 25px;

  &:disabled {
    background: #9fa7b3;
  }
`

export function FriendForm({ onSubmit }) {
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
    if (!values.birthday) {
      errors.birthday = 'Required'
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Required'
    }
    return errors
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validator}
      render={({ handleSubmit, valid, submitting }) => (
        <StyledForm onSubmit={handleSubmit}>
          <StyledField>
            <Field name="firstName">
              {({ input, meta }) => (
                <TextField
                  {...input}
                  type="text"
                  placeholder="First Name"
                  error={meta.error && meta.touched}
                  helperText={'Need your friends name ;)'}
                  variant="filled"
                />
              )}
            </Field>
          </StyledField>
          <StyledField>
            <Field name="lastName">
              {({ input, meta }) => (
                <TextField
                  {...input}
                  type="text"
                  placeholder="Last Name"
                  error={meta.error && meta.touched}
                  helperText={'And of course the last name!'}
                  variant="filled"
                />
              )}
            </Field>
          </StyledField>
          <StyledField>
            <Field name="birthday">
              {({ input, meta }) => (
                <TextField
                  type="date"
                  {...input}
                  defaultValue="1995-01-24"
                  error={meta.error && meta.touched}
                  helperText={'Gonna need you to remember this one'}
                  variant="filled"
                />
              )}
            </Field>
          </StyledField>
          <StyledField>
            <Field name="phoneNumber">
              {({ input, meta }) => (
                <MuiPhoneNumber
                  defaultValue="hi"
                  defaultCountry={'us'}
                  error={meta.error && meta.touched}
                  variant="filled"
                  {...input}
                />
              )}
            </Field>
          </StyledField>
          <StyledButton type="submit" disabled={!valid || submitting}>
            {!valid || submitting ? 'Gotta finish the form :(' : 'Add Friend!'}
          </StyledButton>
        </StyledForm>
      )}
    />
  )
}
