import React from 'react'
import { Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import WelcomePage from '../components/WelcomePage'
import Checklist from '../components/Checklist'
import LoginPage from '../components/Admin/LoginPage'
import AdminPage from '../components/Admin/AdminPage'
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/" component={WelcomePage} exact={true} />
      <PublicRoute path="/list/:listId" component={Checklist} />
      <PublicRoute path="/login" component={LoginPage} />
      <PrivateRoute path="/admin" component={AdminPage} />
    </Switch>
  </Router>
)

export default AppRouter
