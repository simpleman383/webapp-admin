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

  GROUP_KEY_CHANGED:  `@@SERVER_SIDE_LIST-GROUP_KEY_CHANGED--[${key}]`,
  SORT_KEY_CHANGED:  `@@SERVER_SIDE_LIST-SORT_KEY_CHANGED--[${key}]`,
  FILTER_VALUE_CHANGED:  `@@SERVER_SIDE_LIST-FILTER_VALUE_CHANGED--[${key}]`,

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
    case t.GROUP_KEY_CHANGED: {
      return {
        ...state,
        group: action.group
      }
    }
    case t.SORT_KEY_CHANGED: {
      return {
        ...state,
        sort: action.sort
      }
    }
    case t.FILTER_VALUE_CHANGED: {      
      return {
        ...state,
        filter: action.filter
      }
    }
    default: {
      return state
    }
  }
}

export { createReducer, createActionTypes }