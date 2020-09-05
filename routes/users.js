var express = require('express');
var router = express.Router();

const passport = require('passport');
var authentication = require("../middlewares/authentication.js");
const user = require('../controllers/user');

router.get('/graph', authentication.checkLoginWithError, user.showGraph);

router.get('/activity', authentication.checkLoginWithError, user.showActivity);

router.get('/update', authentication.checkLoginWithError, user.showUpdate);
router.post('/update', authentication.checkLoginWithError, user.updateItem);

router.get('/create', authentication.checkLoginWithError, user.showAdd);
router.post('/create', authentication.checkLoginWithError, user.addItem);

module.exports = router;
