import mongoose, { autoIncrement } from './connection';

const GlossaryArticleSchema = new mongoose.Schema({
    title: String,
    creationDate: Date,
    lastEditDate: Date,
    keywords: Array,
    body: Object,
    url: String, 
})

GlossaryArticleSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    return obj;
}

GlossaryArticleSchema.plugin(autoIncrement.plugin, {
    model: 'GlossaryArticle',
    field: 'id',
    startAt: 1
})


const GlossaryArticle = mongoose.model('GlossaryArticle', GlossaryArticleSchema, 'glossaryArticle')


export default GlossaryArticle;