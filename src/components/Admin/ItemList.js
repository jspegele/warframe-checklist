import React from 'react'
import {
  Segment,
  Header,
  Grid,
  Table,
  Icon,
  Message,
  Dimmer,
  Loader,
  Input,
  Button
} from 'semantic-ui-react'
import Modal from 'react-modal'

import database from '../../firebase/firebase'

import ItemForm from './ItemForm'

export default class ItemList extends React.Component {
  state = {
    textFilter: '',
    modal: false,
    modalAction: '',
    item: undefined,
    message: '',
    error: ''
  }
  messageTimer = 0
  componentWillUnmount() {
    clearTimeout(this.messageTimer)
    this.messageTimer = 0
  }
  handleTextFilter = e => this.setState({ textFilter: e.target.value })
  handleAddItem = () => this.openModal()
  handleEditItem = item => {
    this.setState({ item }, () => {
      this.openModal()
    })
  }
  handleSaveItem = item => {
    if (this.state.item) {
      this.saveItemUpdates(item)
    } else {
      this.saveNewItem(item)
    }
  }
  saveItemUpdates = updates => {
    database.ref(`items/${this.state.item.id}`).update(updates)
    .then(() => {
      this.closeModal()
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
  saveNewItem = item => {
    database.ref('items').push(item)
    .then(() => {
      this.closeModal()
      this.setState({
        item: {},
        message: 'Item Added!'
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
  openModal = () => this.setState({ modal: true })
  closeModal = () => this.setState({ modal: false, item: undefined })
  render() {
    const { textFilter, message } = this.state
    let items = []
    if (this.props.items.length > 0) {
      items = this.props.items
        .filter(item => {
          return (
            item.name.toLowerCase().includes(textFilter.toLowerCase()) ||
            item.category.toLowerCase().includes(textFilter.toLowerCase()) ||
            item.slot.toLowerCase().includes(textFilter.toLowerCase()) ||
            item.type.toLowerCase().includes(textFilter.toLowerCase()) ||
            item.source.toLowerCase().includes(textFilter.toLowerCase())
          )
        })
        .sort((a, b) => {
          return a.name > b.name ? 1 : -1;
        })
    }
    const filterIcon = textFilter.length === 0 ? (null) : (
      <Icon name='delete' color="grey" link onClick={() => this.setState({ textFilter: '' })} />
    )
    return (
      <>
      <Header as="h2">Item List</Header>
      {message && <Message color="violet">{message}</Message>}
      <Grid>
        <Grid.Column width="6">
          <Input
            fluid
            placeholder="Filter List"
            value={textFilter}
            onChange={this.handleTextFilter}
            icon={filterIcon}
          />
        </Grid.Column>
        <Grid.Column width="6" verticalAlign="middle">
          Showing <strong>{items.length}</strong> items
        </Grid.Column>
        <Grid.Column width="4" textAlign="right">
          <Button primary onClick={this.handleAddItem}>
            Add New Item
          </Button>
        </Grid.Column>
      </Grid>
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
                      <Icon
                        name="edit"
                        color="blue"
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.handleEditItem(item)}
                      />
                    </Table.Cell>
                    <Table.Cell width="2">{item.category}</Table.Cell>
                    <Table.Cell width="2">{item.slot}</Table.Cell>
                    <Table.Cell width="2">{item.type}</Table.Cell>
                    <Table.Cell width="3">
                      <a
                        href={item.link}
                        title="View on Wiki"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.name}
                      </a>
                    </Table.Cell>
                    <Table.Cell width="3">{item.source}</Table.Cell>
                    <Table.Cell width="1">{item.mastery}</Table.Cell>
                    <Table.Cell width="1">{item.mr}</Table.Cell>
                    <Table.Cell width="1">
                      {item.prime ? (<Icon name="checkmark" color="grey" title="Prime" />) : ''}
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
          isOpen={this.state.modal}
          onRequestClose={this.closeModal}
          contentLabel="Edit Item"
          closeTimeoutMS={200}
          className="modal modal--form"
          overlayClassName="overlay"
        >
          <Header as="h3">Edit Item</Header>
          <ItemForm onSubmit={this.handleSaveItem} onCancel={this.closeModal} item={this.state.item} />
        </Modal>
        </>
      ) : (
        <>
        {textFilter.length > 0 ? (
          <Segment placeholder>
            <Header size="medium" color="grey" icon>
              <Icon name="search" />
              No Items Found
            </Header>
          </Segment>
        ) : (
          <div style={{ height: '300px' }}>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </div>
        )}
        </>
      )}
      </>
    )
  }
}
