import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Dashboard from './containers/dashboard'
import Glossary from './containers/glossary'


import Layout from './components/layout'


import './styles/fonts.scss'
import './styles/app.scss'


const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/admin-panel/" component={Dashboard} />
      <Route exact path="/admin-panel/glossary" component={Glossary} />

    </Switch>
  </Layout>

);

export default App;
