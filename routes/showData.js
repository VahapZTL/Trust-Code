var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Urun = mongoose.model('Urun');
var config = require('../config/config');

/* GET home page. */
router.get('/:hashedId', function(req, res, next) {

    var accessToken = req.params.hashedId;

    jwt.verify(accessToken, config.Secret, function (err, decoded) {
        if(err){
            res.json({
                success: false,
                data: 'Token bilgisinde hata var!'
            });
        }else{
            Urun.findOne({ _id: decoded}, function (err, data) {
                if(err)
                    throw err;
                res.json({
                    resimUrl: data.local.resimURL,
                    urunAdi: data.local.urunAdi,
                    sonKulYil: data.local.sonKullanma.getFullYear(),
                    sonKulAy: data.local.sonKullanma.getMonth(),
                    sonKulGun: data.local.sonKullanma.getDate(),
                    uretimTarYil: data.local.uretimTarihi.getFullYear(),
                    uretimTarAy: data.local.uretimTarihi.getMonth(),
                    uretimTarGun: data.local.uretimTarihi.getDate(),
                    uretimYeri: data.local.uretimYeri
                });
            });
        }
    });
});

module.exports = router;

