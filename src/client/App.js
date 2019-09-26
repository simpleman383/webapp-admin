import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Test from './containers/test'

const App = () => (
  <Switch>

    <Route exact path="/" component={Test} />


  </Switch>
);

export default App;
