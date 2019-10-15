import { fetch } from '../helpers'
 
const GlossaryInterface = {

  getAllArticles : async () => {
    const response = await fetch('/admin/glossary')
    return response.data.articles;
  },

  getArticle : async (id) => {
    const response = await fetch(`/admin/glossary/${id}`)
    return response.data.article;
  }

}

export default GlossaryInterface