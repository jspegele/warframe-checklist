import React from 'react';
import Modal from 'react-modal';
import { Header, Button } from 'semantic-ui-react'

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
      <Header as="h2">Confirmation</Header>
      {props.confirmMsg && (
        <p>{props.confirmMsg}</p>
      )}
    </div>
    <div className="modal__actions">
      <Button onClick={props.cancel}>Cancel</Button>
      <Button primary color="green" onClick={props.action}>Mark All</Button>
    </div>
  </Modal>
);

export default ConfirmationModal;
