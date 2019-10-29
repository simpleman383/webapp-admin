import { actionTypes as type } from '.'

import backend from '../../services/backend'


export const getArticleList = (filter, group, sort) => async (dispatch) => {
  const items = await backend.glossary.getArticleList({ filter, group, sort })

  dispatch({ 
    type: type.LOAD_DATA,
    data: items || []
  })

}

export const handleGroupChange = group => ({
    type: type.GROUP_KEY_CHANGED,
    group
})

export const handleSortChange = sort => ({
    type: type.SORT_KEY_CHANGED,
    sort
})

export const handleFilterChange = filter => ({
    type: type.FILTER_VALUE_CHANGED,
    filter
})