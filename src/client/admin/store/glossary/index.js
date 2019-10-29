import { combineReducers } from 'redux'
import { createReducer, createActionTypes } from '../server-side-processed-list'

const REDUCER_KEY = 'test-glossary'


const commonPage = (state = {}, action) => state


const defaultListState = {
  data: [],
  group: 'creationDate',
  filter: null,
  sort: 'asc',
}


const listView = createReducer(REDUCER_KEY, defaultListState)
const actionTypes = createActionTypes(REDUCER_KEY)

export default combineReducers({listView})
export { actionTypes }


