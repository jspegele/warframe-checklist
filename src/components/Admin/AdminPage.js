import React from 'react'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'

import { history } from '../../routers/AppRouter'

import AdminTabs from './AdminTabs'

const AdminPage = ({ isAuthenticated }) => {
  return (
    <>
    {isAuthenticated ? (
      <Container style={{ marginTop: 40, marginBottom: 40 }}>
        <Header as="h1">Administration</Header>
        <AdminTabs />
      </Container>
    ) : (
      history.push('/')
    )}
    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(AdminPage)
