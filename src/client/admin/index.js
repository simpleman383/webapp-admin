import App from './App';
import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from './store/reducers'

const store = createStore(combineReducers(reducers), applyMiddleware(thunk));


export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}
