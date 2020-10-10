var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate'),
    bcrypt = require('bcrypt-nodejs');

module.exports = function() {
    var company = mongoose.Schema({
        name: {
            type: String,
            required: false,
            unique: false
        },
        username: {
            type: String,
            required: false,
            unique: false,
        },
        password: {
            type: String,
            required: false
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: false
        },
        description: {
            type: String,
            required: false
        },
        credit: {
            type: Number,
            required:false
        },
        image: {
            type: String
        },
        street: {
            type: String,
            required: false
        },
        number: {
            type: String,
            required: false
        },
        neighborhood: {
            type: String,
            required: false
        },
        state: {
            type: mongoose.Schema.ObjectId,
            ref: 'State',
            required: false
        },
        city: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: String
        },
        cellPhone: {
            type: String
        },
        site: {
            type: String
        },
        email: {
            type: String
        },
        facebook: {
            type: String
        }
    });

    company.plugin(findOrCreate);

    company.pre('save', function(next) {
        var company = this;
        if (!company.isModified('password')) return next();
        bcrypt.genSalt(5, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(company.password, salt, null, function(err, hash) {
                if (err) return next(err);
                company.password = hash;
                next();
            });
        });
    });

    company.methods.authentication = function(password, next) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) return next(err);
            next(isMatch);
        });
    };

    return mongoose.model('Company', company);
};
