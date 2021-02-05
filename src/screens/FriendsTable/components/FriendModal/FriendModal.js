import React from 'react'
import Modal from '@material-ui/core/Modal'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import { CreateFriendForm } from '../CreateFriendForm'

const StyledPaper = styled(Paper)`
  position: 'absolute';
  width: 75%;
  height: 60%;
  border-radius: 20px;
  position: relative;
  left: 45px;
  top: 50px;
`

export function FriendModal({ handleClose, isOpen, onSubmit }) {
  const body = (
    <StyledPaper>
      <CreateFriendForm onSubmit={onSubmit} />
    </StyledPaper>
  )

  return (
    <Modal open={isOpen} onBackdropClick={handleClose}>
      {body}
    </Modal>
  )
}
