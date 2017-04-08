var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var mongoose = require('mongoose');
var Hash = mongoose.model('Hash');

/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
    res.render('urunsifrele', {user: req.user});
});

router.post('/', isLoggedIn, function (req, res, next) {

        var token = jwt.sign({ _id : req.body.urunID }, config.Secret);
        res.json({
            message: token
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
