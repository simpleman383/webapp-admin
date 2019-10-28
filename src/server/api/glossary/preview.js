import { response, error } from '../../utils'
import repository from '../../repository/glossary'
import { groupItems } from './helpers'

const apiPreview = {
  getPreviews: (req, res) => {
        
    const { search, group, sort } = req.query
    
    repository.getArticlePreviews()
        .then(previews => previews.map(preview => preview.toJSON()))
        .then(previews => {
            // filtering
            if (search && search.trim()) {
                return previews.filter(preview => {
                    if (!preview || !preview.title) 
                        return false
                    return preview.title.toLowerCase().includes(search.toLowerCase())
                })
            }
            return previews
        })
        .then(previews => {
            // grouping
            if (!group) {
                return previews
            }

            switch (group.toLowerCase()) {
                case 'title': {
                    return groupItems(previews, item => item.title.toLowerCase()[0])  
                }
                case 'creationdate': {
                    return groupItems(previews, item => {
                        const date = new Date(item.creationDate)
                        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                    })  
                }
                case 'lasteditdate': {
                    return groupItems(previews, item => {
                        const date = new Date(item.lastEditDate)
                        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                    })  
                }
                default:
                    return previews
            }
        })
        .then(previews => {
            // sorting
            if (!sort) {
                return previews
            }

            switch (sort) {
                case 'desc' : {
                    return previews.sort((a, b) => a.title < b.title ? -1 : 1)
                }
                default:
                case 'asc' : {
                    return previews.sort((a, b) => a.title < b.title ? 1 : -1)
                }
            }
        })
        .then(previews => response.success(res)(previews))
        .catch(err => {
            return response.error(res)(error.DB_ERROR);
        })
  },
}

export default apiPreview