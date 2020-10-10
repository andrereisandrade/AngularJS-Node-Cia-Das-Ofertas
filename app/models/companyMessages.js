var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate');

module.exports = function(){
    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        company: {
            type: mongoose.Schema.ObjectId,
            ref: 'Company',
            required: true
        },
        email: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    });

    schema.plugin(findOrCreate);
    return mongoose.model('CompanyMessage', schema);
};
