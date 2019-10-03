import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Dashboard from './containers/dashboard'
import Glossary from './containers/glossary'




import './fonts.scss'

import './app.scss'


const App = () => (
  <Switch>

    <Route exact path="/" component={Dashboard} />

    <Route exact path="/glossary" component={Glossary} />



  </Switch>
);

export default App;
