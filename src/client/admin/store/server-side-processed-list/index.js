const defaultState = {
  data: [],
  pageIndex : 0,
  pageSize: 10,
  pageCount: undefined,
  group: null,
  filter: null,
  sort: null,
}

const createActionTypes = key => ({
  LOAD_DATA: `@@SERVER_SIDE_LIST-LOAD_DATA--[${key}]`,
  SET_PAGE_SIZE: `@@SERVER_SIDE_LIST-SET_PAGE_SIZE--[${key}]`,
  SET_PAGE_IDX: `@@SERVER_SIDE_LIST-SET_PAGE_IDX--[${key}]`,  
})

const createReducer = (key, initialState = defaultState) => (state = initialState, action) => {
  const t = createActionTypes(key)

  switch (action.type) {
    case t.LOAD_DATA: {
      return {
        ...state,
        data: action.data
      }
    }
    case t.SET_PAGE_SIZE: {
      return {
        ...state,
        pageSize: action.pageSize
      }
    }
    case t.SET_PAGE_IDX: {
      return {
        ...state,
        pageIndex: action.pageIndex
      }
    }
    default: {
      return state
    }
  }
}

export default { createReducer, createActionTypes }