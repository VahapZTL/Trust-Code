var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
    res.render('success', {user: req.user, message: 'Kayıt Ekleme Başarılı!'});
});

module.exports = router;

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}/**
 * Created by VahapZTL on 8.04.2017.
 */
