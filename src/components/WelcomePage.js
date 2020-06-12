import React, { useState } from 'react'
import { Container, Segment, Header, Button, Icon, Loader } from 'semantic-ui-react'
import { history } from '../routers/AppRouter'

const shortid = require('shortid')

export default () => {
  const [loading, setLoading] = useState(false)

  const createChecklist = () => {
    setLoading(true)
    const id = shortid.generate()
    history.push(`/${id}`)
  }

  return (
    <Container style={{ marginTop: 40, marginBottom: 40 }}>
      {loading ? (
        <Loader active inline="centered" style={{ marginTop: 40, marginBottom: 40 }}>
          Generating Checklist
        </Loader>
      ) : (
        <Segment style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Header as="h1" style={{ fontSize: 18 }}>Welcome to Warframe Checklist</Header>
          <p>Create a new checklist to get started. Be sure to <strong>bookmark your checklist URL</strong> so you can return to it later.</p>
          <p style={{ marginBottom: 40 }}>Already have a checklist? Go directly to your bookmarked url to access it.</p>
          <Button color="blue" icon labelPosition='right' onClick={createChecklist}>
            Create a Checklist
            <Icon name="right arrow" />
          </Button>
        </Segment>
      )}
    </Container>
  )
}
