import GlossaryArticle from '../../config/schemas/glossary'
import baseRepository from '../basic'

const glossaryRepository = {
    ...baseRepository(GlossaryArticle),
}

export default glossaryRepository;