import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react'

import { history } from '../../routers/AppRouter'
import { startLogin } from '../../actions/auth'

class LoginPage extends React.Component {
  state = {
    email: '',
    password: ''
  }
  handleEmail = e => this.setState({ email: e.target.value })
  handlePassword = e => this.setState({ password: e.target.value })
  handleLogin = () => this.props.startLogin(this.state.email, this.state.password)
  render() {
    return (
      <>
      {this.props.isAuthenticated ? (
        history.push('/admin')
      ) : (
        <Grid textAlign='center' style={{ height: '100vh', marginTop: '-12rem' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='violet' textAlign='center'>
              <Icon name='check circle' size='huge' /> Admin Login
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  onChange={this.handleEmail}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={this.handlePassword}
                />
      
                <Button color='violet' fluid size='large' onClick={this.handleLogin}>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps, { startLogin })(LoginPage)
