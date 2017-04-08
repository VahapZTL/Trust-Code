var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Urun = mongoose.model('Urun');

/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
    res.render('urunekle', {user: req.user});
});

router.post('/', isLoggedIn, function (req, res, next) {
    var tarSonKul = req.body.sonKullanma.split("/");
    var tarUret = req.body.uretimTarihi.split("/");
    var tarSonKulDB = new Date(tarSonKul[2], tarSonKul[1], tarSonKul[0]);
    var tarUretDB = new Date(tarUret[2], tarUret[1], tarUret[0]);

    var newUrun = new Urun();
    newUrun.local.markaID = req.user._id;
    newUrun.local.resimURL = req.body.resimUrl;
    newUrun.local.urunAdi = req.body.urunAdi;
    newUrun.local.sonKullanma = tarSonKulDB;
    newUrun.local.uretimTarihi = tarUretDB;
    newUrun.local.uretimYeri = req.body.uretimYeri;

    newUrun.save(function (err) {
        if(err) {
            console.log(err);
        }else{
            res.redirect('/success');
        }
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}
