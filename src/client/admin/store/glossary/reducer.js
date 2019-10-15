import * as type from '../glossary/actionTypes'

const initialState = {
  articles: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case type.GLOSSARY_ARTICLE_LIST_LOAD: {
      return {
        ...state,
        articles: action.articles
      }
    }
    default:
      return state;
  }
}