const repository = (Model) => {
    return {
        model: Model, 
        save: function(object) {
            const model = new Model(object);
            return model.save();
        },
        get: function(query) {
            return query ? Model.findOne(query) : Model.find();
        },
        update: function(query, object) {
            return Model.updateMany(query, object, { upsert: true });
        },
        delete: function(query) {
            return query ? Model.deleteOne(query) : Model.deleteMany();
        }
    }
}

export default repository;