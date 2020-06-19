import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Container, Grid, Header, Menu } from 'semantic-ui-react'

import { history } from '../routers/AppRouter'
import { startLogout } from '../actions/auth'

const AppHeader = ({uid, startLogout}) => (
  <Container style={{ paddingTop: 40 }}>
    <Grid>
      <Grid.Column width="12">
        <Link to="/"><Header as="h1" content="Warframe Checklist" /></Link>
      </Grid.Column>
      <Grid.Column width="4" textAlign="right">
        {uid && (
          <Menu secondary floated="right">
            <Menu.Item
              name='Admin'
              onClick={() => history.push('/admin')}
            />
            <Menu.Item
              name='Logout'
              onClick={startLogout}
            />
          </Menu>
        )}
      </Grid.Column>
    </Grid>
  </Container>
)

const mapStateToProps = state => ({
  uid: state.auth.uid
})

export default connect(mapStateToProps, { startLogout })(AppHeader)
