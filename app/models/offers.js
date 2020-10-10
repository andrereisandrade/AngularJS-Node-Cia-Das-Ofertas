var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
    var offer = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        company: {
            type: mongoose.Schema.ObjectId,
            ref: 'Company',
            required: true
        },
        amountOfOffers: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
        },
        dateOfExpiration: {
            type: String,
            required: true
        },
        generationsCoupons: [{
            user_Id: {
                type: mongoose.Schema.ObjectId,
                ref: 'Users',
                required: true,
            },
            email: {
                type: String,
                required: true
            },
            number: {
                type: String,
                required: true
            },
            utilized: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            }
        }]
    });

    offer.plugin(findOrCreate);
    return mongoose.model('Offer', offer);
};
