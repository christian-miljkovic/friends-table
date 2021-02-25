import React from 'react'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import { CreateFriendForm } from '../CreateFriendForm'
import { BasicForm } from '../../../../components/BasicForm'
import { deleteFriend } from '../../../api/friends'
import { useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'

const StyledPaper = styled(Paper)`
  position: 'absolute';
  width: 75%;
  height: 60%;
  border-radius: 20px;
  position: relative;
  left: 45px;
  top: 50px;
`

export function FriendModal({ handleClose, isOpen, onSubmit, friend = {} }) {
  const { addToast } = useToasts()
  const [deleteFriendQuery] = useMutation(deleteFriend, {
    onError() {
      addToast('Failed to delete friends', { appearance: 'error' })
    },
    onSuccess(resp) {
      addToast('Successfully delete friend :(', { appearance: 'success' })
    },
  })

  const body = (
    <StyledPaper>
      {isEmpty(friend) ? (
        <CreateFriendForm onSubmit={onSubmit} />
      ) : (
        <BasicForm
          title="Edit Friend"
          initialValues={friend}
          handleSubmit={() => {
            deleteFriendQuery({ friendId: friend.id })
          }}
        />
      )}
    </StyledPaper>
  )

  return (
    <Modal open={isOpen} onBackdropClick={handleClose}>
      {body}
    </Modal>
  )
}
