import { combineReducers } from 'redux'
import { createReducer, createActionTypes } from '../server-side-processed-list'

const REDUCER_KEY = 'test-glossary'


const utils = (state = {}, action) => state


const defaultListState = {
  data: [],
  pageIndex : 0,
  pageSize: 10,
  pageCount: undefined,
  group: null,
  filter: null,
  sort: null,
}


const data = createReducer(REDUCER_KEY, defaultListState)
const actionTypes = createActionTypes(REDUCER_KEY)

export default combineReducers(utils, data)
export { actionTypes }