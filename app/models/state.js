var mongoose = require('mongoose'),
findOrCreate = require('mongoose-findorcreate');

module.exports = function(){
    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        acronyms: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        }
    });

    schema.plugin(findOrCreate);
    return mongoose.model('State', schema);
};
