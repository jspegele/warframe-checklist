import React from 'react'
import { Header, Table, Icon, Message, Placeholder,Dimmer, Loader } from 'semantic-ui-react'
import Modal from 'react-modal'

import database from '../../firebase/firebase'

import ItemForm from './ItemForm'

export default class ItemList extends React.Component {
  state = {
    editModal: false,
    item: {},
    message: ''
  }
  messageTimer = 0
  componentWillUnmount() {
    clearTimeout(this.messageTimer)
    this.messageTimer = 0
  }
  handleEditItem = item => {
    this.setState({ item }, () => {
      this.openEditModal()
    })
  }
  handleSaveItem = updates => {
    database.ref(`items/${this.state.item.id}`).update(updates)
    .then(() => {
      this.closeEditModal()
      this.setState({
        item: {},
        message: 'Item Updated!'
      }, () => {
        this.messageTimer = setTimeout(() => this.setState({ message: '' }), 5000)
      })
    })
    .catch(e => {
      this.setState({
        error: e.message
      })
    })
  }
  openEditModal = () => this.setState({ editModal: true })
  closeEditModal = () => this.setState({ editModal: false })
  render() {
    const { items } = this.props
    const { message } = this.state
    return (
      <>
      <Header as="h2">Item List</Header>
      {message && <Message color="violet">{message}</Message>}
      {items.length > 0 ? (
        <>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Slot</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Source</Table.HeaderCell>
              <Table.HeaderCell>Mastery</Table.HeaderCell>
              <Table.HeaderCell>MR</Table.HeaderCell>
              <Table.HeaderCell>Prime</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              items.map((item, i) => {
                return (
                  <Table.Row key={i} className="item-table__row">
                    <Table.Cell textAlign="center">
                      <Icon name="edit" color="blue" style={{ cursor: 'pointer' }} onClick={() => this.handleEditItem(item)} />
                    </Table.Cell>
                    <Table.Cell width="2">{item.category}</Table.Cell>
                    <Table.Cell width="2">{item.slot}</Table.Cell>
                    <Table.Cell width="2">{item.type}</Table.Cell>
                    <Table.Cell width="3">
                      <a href={item.link} title="View on Wiki" target="_blank" rel="noopener noreferrer">{item.name}</a>
                    </Table.Cell>
                    <Table.Cell width="3">{item.source}</Table.Cell>
                    <Table.Cell width="1">{item.mastery}</Table.Cell>
                    <Table.Cell width="1">{item.mr}</Table.Cell>
                    <Table.Cell width="1">
                      {item.prime ? <Icon name="checkmark" color="grey" title="Prime" /> : ''}
                      {item.vaulted ? <Icon name="lock" color="grey" title="Vaulted" /> : ''}
                    </Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
        <Modal
          appElement={document.getElementById('app')}
          isOpen={this.state.editModal}
          onRequestClose={this.closeEditModal}
          contentLabel="Edit Item"
          closeTimeoutMS={200}
          className="modal modal--form"
          overlayClassName="overlay"
        >
          <Header as="h3">Edit Item</Header>
          <ItemForm onSubmit={this.handleSaveItem} item={this.state.item} />
        </Modal>
        </>
      ) : (
        <>
        <div style={{ height: '300px' }}></div>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        </>
      )}
      </>
    )
  }
}
