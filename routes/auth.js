var express = require('express');
var router = express.Router();

const passport = require('passport');
var authentication = require("../middlewares/authentication.js");
const auth = require('../controllers/auth');

router.get('/', authentication.checkLoginNoError, auth.showIndex);

router.get('/login', authentication.checkLoginNoError, auth.showLogin);
router.post('/login', passport.authenticate("local", {
    successRedirect: "/update",
    failureRedirect: "/login",
    failureFlash: true
}), auth.loginUser);

router.get('/logout', authentication.checkLoginWithError, auth.logoutUser);

router.get('/register', authentication.checkLoginNoError, auth.showRegister);
router.post('/register', auth.createUser);

module.exports = router;
