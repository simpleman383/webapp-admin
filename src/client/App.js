import React from 'react'
import Website from './website'
import Admin from './admin'

import { Route, Switch } from 'react-router-dom';

export default () => (
  <Switch>
    <Route path="/admin-panel" component={Admin} />
    <Route path="/:language?" component={Website} />
  </Switch>
)