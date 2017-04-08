var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urunSchema = Schema({

    local: {
        resimURL: String,
        markaID: {
            type: Schema.ObjectId,
            ref: 'Company'
        },
        urunAdi: String,
        sonKullanma: {
            type: Date,
            default: Date.now
        },
        uretimTarihi: {
            type: Date,
            default: Date.now
        },
        uretimYeri: String
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Urun', urunSchema);/**
 * Created by VahapZTL on 7.04.2017.
 */
