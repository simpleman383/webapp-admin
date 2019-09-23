import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Login from './Login'

const App = () => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/error" component={() => 'Error'} />

  </Switch>
);

export default App;
