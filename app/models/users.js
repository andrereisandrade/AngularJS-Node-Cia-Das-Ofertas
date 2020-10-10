var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

module.exports = function() {

    var Users = mongoose.Schema({
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: false
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        permition:{
            type: String,
            required: false
        }
    });

    Users.pre('save', function(next) {
        var user = this;
        if (!user.isModified('password')) return next();
        bcrypt.genSalt(5, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    });

    Users.methods.authentication = function(password, next) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) return next(err);
            next(isMatch);
        });
    };

    return mongoose.model('Users', Users);
};
