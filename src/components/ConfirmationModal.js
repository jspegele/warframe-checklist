import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const ConfirmationModal = (props) => (
  <Modal
    appElement={document.getElementById('app')}
    isOpen={props.modalOpen}
    onRequestClose={props.cancel}
    contentLabel="Confirm"
    closeTimeoutMS={200}
    className="modal"
    overlayClassName="overlay"
  >
    <div className="modal__body">
      <Header as="h2">{props.message}</Header>
    </div>
    <div className="modal__actions">
      <Button onClick={props.cancel}>Cancel</Button>
      <Button primary color="green" onClick={props.action}>{props.actionText}</Button>
    </div>
  </Modal>
)

ConfirmationModal.defaultProps = {
  message: 'Confirm',
  actionText: 'Yes'
}

export default ConfirmationModal;
