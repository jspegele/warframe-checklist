import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import WelcomePage from '../components/WelcomePage'
import Checklist from '../components/Checklist'

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <AppHeader />
    <Switch>
      <Route path="/" component={WelcomePage} exact={true} />
      <Route path="/:listId" component={Checklist} />
    </Switch>
    <AppFooter />
  </Router>
);

export default AppRouter;
