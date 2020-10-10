var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate');

module.exports = function(){
    var city = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        state: {
            type: mongoose.Schema.ObjectId,
            ref: 'State',
            required: true
        },
    });

    city.plugin(findOrCreate);
    return mongoose.model('City', city);
};
