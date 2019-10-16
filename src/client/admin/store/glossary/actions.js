import * as type from './actionTypes'
import backend from '../../services/backend'

export const loadArticleList = () => async (dispatch) => {
  const previews = await backend.glossary.getArticlePreviews()

  dispatch({ 
    type: type.GLOSSARY_ARTICLE_PREVIEW_LIST_LOAD,
    previews: previews || []
  })

  
}