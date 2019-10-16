import { fetch } from '../helpers'
 
const GlossaryInterface = {

  getArticlePreviews : async () => {
    const response = await fetch('/admin/glossary-previews')
    return response.data;
  },

  getArticle : async (id) => {
    const response = await fetch(`/admin/glossary/${id}`)
    return response.data;
  }

}

export default GlossaryInterface