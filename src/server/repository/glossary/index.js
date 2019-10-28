import GlossaryArticle from '../../config/schemas/glossary'
import baseRepository from '../basic'


const glossaryRepository = {
    ...baseRepository(GlossaryArticle),

    getArticlePreviews: () => {
        return GlossaryArticle.find({}, { id: 1, title: 1, keywords: 1, creationDate: 1, lastEditDate: 1, })
    }
}



export default glossaryRepository;