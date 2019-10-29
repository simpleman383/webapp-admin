import { fetch } from '../helpers'
 
const GlossaryInterface = {

  getArticleList : async (options) => {
    const { filter, group, sort } = options || {}

    const url = new URL('/admin/glossary/previews', window.location.origin)
    filter && url.searchParams.append('search', filter)
    group && url.searchParams.append('group', group)
    sort && url.searchParams.append('sort', sort)

    const response = await fetch(url)
    return response.data;
  },

  getArticle : async (id) => {
    const response = await fetch(`/admin/glossary/${id}`)
    return response.data;
  }

}

export default GlossaryInterface