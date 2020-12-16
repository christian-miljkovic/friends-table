import React from 'react'
import { Form, Field } from 'react-final-form'
import PhoneInput from 'react-phone-input-2'

export function FriendForm({ onSubmit }) {
  const handleSubmit = async (values) => {
    onSubmit(values)
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
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field name="firstName">
            {({ input, meta }) => (
              <div>
                <label>First Name</label>
                <input {...input} type="text" placeholder="First Name" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="lastName">
            {({ input, meta }) => (
              <div>
                <label>Last Name</label>
                <input {...input} type="text" placeholder="Last Name" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="birthday">
            {({ input, meta }) => (
              <div>
                <label>Birthday</label>
                <input {...input} type="date" placeholder="Birthday" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="phoneNumber">
            {({ input, meta }) => (
              <div>
                <PhoneInput
                  label="Phone Number"
                  error={meta.error && meta.touched && <span>{meta.error}</span>}
                  {...input}
                />
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
          </div>
        </form>
      )}
    />
  )
}
