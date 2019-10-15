import * as type from './actionTypes'
import backend from '../../services/backend'

export const loadArticleList = () => async (dispatch) => {
  const articles = await backend.glossary.getAllArticles()

  dispatch({ 
    type: type.GLOSSARY_ARTICLE_LIST_LOAD,
    articles: articles || []
  })

  
}