import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route {...rest} component={(props) => (
    <>
      <AppHeader />
      <Component {...props} />
      <AppFooter />
    </>
  )} />
);

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute)
