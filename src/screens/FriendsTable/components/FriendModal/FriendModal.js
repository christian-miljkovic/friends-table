import React from 'react'
import Modal from '@material-ui/core/Modal'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import { FriendForm } from '../FriendForm'

const StyledPaper = styled(Paper)`
  position: 'absolute';
  width: 75%;
  height: 50%;
  border-radius: 8px;
  position: relative;
  left: 45px;
  top: 50px;
`

export function FriendModal({ data = {}, handleOnClose, isOpen, onSubmit }) {
  const { firstName, lastName } = data

  const body = (
    <StyledPaper>
      <FriendForm onSubmit={onSubmit} />
    </StyledPaper>
  )

  return (
    <Modal open={isOpen} onClose={handleOnClose}>
      {body}
    </Modal>
  )
}
