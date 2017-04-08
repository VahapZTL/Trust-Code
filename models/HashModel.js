var mongoose = require('mongoose');

var hashSchema = mongoose.Schema({

    hash: [{
        type: String
    }]
});

module.exports = mongoose.model('Hash', hashSchema);
