var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    local: {
        name: String,
        email: String,
        password: String,
        createdDate: {
            type: Date,
            default: Date.now
        }
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.findById = function(id, cb) {
    process.nextTick(function() {
        var idx = id - 1;
        if (userSchema[idx]) {
            cb(null, userSchema[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);