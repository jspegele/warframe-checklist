import React from 'react'
import { Header, Message } from 'semantic-ui-react'

import database from '../../firebase/firebase'

import ItemForm from './ItemForm'

class AddItem extends React.Component {
  state = {
    error: undefined,
    item: undefined
  }
  onSubmit = item => {
    database.ref('items').push(item)
    .then(() => {
      alert("New Item Added to Firebase")
    })
    .catch(e => {
      this.setState({
        error: e.message
      })
    })
  }
  render() {
    return (
      <>
        <Header as="h2">Add New Item</Header>
        {this.state.error && (
          <Message
            error
            header='Error Writing to Database'
            content={this.state.error}
          />
        )}
        <ItemForm onSubmit={this.onSubmit} item={this.state.item} />
      </>
    )
  }
}

export default AddItem
