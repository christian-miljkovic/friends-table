import React from 'react'
import Modal from '@material-ui/core/Modal'

export function FriendModal({ data = {}, isOpen }) {
  const { firstName, lastName } = data

  const body = (
    <div>
      <h2 id="simple-modal-title">{firstName + ' ' + lastName}</h2>
    </div>
  )

  return <Modal open={isOpen}>{body}</Modal>
}
