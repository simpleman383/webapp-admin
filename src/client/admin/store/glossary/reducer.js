import * as type from '../glossary/actionTypes'

const initialState = {
  previews: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case type.GLOSSARY_ARTICLE_PREVIEW_LIST_LOAD: {
      return {
        ...state,
        previews: action.previews
      }
    }
    default:
      return state;
  }
}