import React from 'react'
import { Container, Segment, Header, Button, Icon, Loader } from 'semantic-ui-react'
import { history } from '../routers/AppRouter'

const shortid = require('shortid')

class WelcomePage extends React.Component {
  state = {
    loading: false,
    checklists: localStorage.getItem('checklists') ? JSON.parse(localStorage.getItem('checklists')) : []
  }
  createChecklist = () => {
    const id = shortid.generate()
    this.setState({
      loading: true,
      checklists: [...this.state.checklists, id]
    }, () => {
      localStorage.setItem('checklists', JSON.stringify(this.state.checklists))
      history.push(`/list/${id}`)
    })
  }
  render() {
    const { loading, checklists } = this.state
    return (
      <Container style={{ marginTop: 40, marginBottom: 40 }}>
        {loading ? (
          <Loader active inline="centered" style={{ marginTop: 40, marginBottom: 40 }}>
            Generating Checklist
          </Loader>
        ) : (
          <>
            <Header as="h1" style={{ fontSize: 18 }}>Welcome to Warframe Checklist</Header>
            {checklists.length > 0 && (
              <Segment>
                <p style={{ fontWeight: 'bold' }}>We found the following checklists created by you:</p>
                {checklists.map((checklist, i) => (
                  <p key={i}><a href={window.location.href + 'list/' + checklist}>{window.location.href + 'list/' + checklist}</a></p>
                ))}
                <p style={{ fontStyle: 'italic' }}>
                  Please bookmark your checklists. We will not be able to find your checklists if you 
                  clear your browsing data.
                </p>
              </Segment>
            )}
            <p>Create a new checklist to get started. Be sure to <strong>bookmark your checklist URL</strong> so you can return to it later.</p>
            <p style={{ marginBottom: 40 }}>Already have a checklist? Go directly to your bookmarked url to access it.</p>
            <Button color="blue" icon labelPosition='right' onClick={this.createChecklist}>
              Create a Checklist
              <Icon name="right arrow" />
            </Button>
          </>
        )}
      </Container>
    )
  }
}

export default WelcomePage
