import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'

import AddItemForm from './AddItemForm'

const AdminPage = () => {
  return (
    <Container style={{ marginTop: 40, marginBottom: 40 }}>
      <Header as="h1">Administration</Header>
      <Segment>
        <AddItemForm />
      </Segment>
    </Container>
  )
}

export default AdminPage
