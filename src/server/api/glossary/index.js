import { response, error } from '../../utils'
import repository from '../../repository/glossary'


const api = {
    saveArticle: (req, res) => {
        
        const article = {
            ...req.body,
            creationDate : new Date(),
            lastEditDate : new Date(),
        };

        repository.save(article)
            .then(result => {
                return response.success(res)();
            })
            .catch(err => {
                return response.error(res)(error.DB_ERROR);
            })
    },

    updateArticle: (req, res) => {

        const article = {
            ...req.body,
            lastEditDate: new Date()
        }

        repository.update({ id: req.params.id }, { ...article } )
            .then(result => {
                return response.success(res)();
            })
            .catch(err => {
                return response.error(res)(error.DB_ERROR);
            })
            
    },

    getArticle: (req, res) => {        
        repository.get({ id: req.params.id })
            .then(article => article.toJSON() )
            .then(article => {
                return response.success(res)(article)
            })
            .catch(err => {
                return response.error(res)(error.DB_ERROR);
            })
    },


    getArticles: (req, res) => {
        repository.get()
            .then(articles => articles.map(article => article.toJSON()))
            .then(articles => {
                return response.success(res)(articles);
            })
            .catch(err => {
                return response.error(res)(error.DB_ERROR);
            })
    },  

    getPreviews: (req, res) => {
        repository.getArticlePreviews()
            .then(preview => preview.map(preview => preview.toJSON()))
            .then(previews => {
                return response.success(res)(previews);
            })
            .catch(err => {
                return response.error(res)(error.DB_ERROR);
            })
    }

}

export default api;