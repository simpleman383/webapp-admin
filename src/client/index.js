import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(combineReducers([]), applyMiddleware(thunk));

hydrate(

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
