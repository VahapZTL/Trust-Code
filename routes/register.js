var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/', passport.authenticate('local-signup', {
    successRedirect : '/register', // redirect to the secure profile section
    failureRedirect : '/register', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

module.exports = router;
