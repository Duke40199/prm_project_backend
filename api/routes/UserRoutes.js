'use strict';

/**
 * User Route
 * path: /user
 */

let express = require('express');
let Controller = require('../controllers/UserController');
let router = express.Router();
let passport = require('passport');
let { isAdmin } = require('../middlewares/authorization');
router.get('/', passport.authenticate('jwt', { session: false }), isAdmin, Controller.view.get);
router.get('/:username', Controller.view_one.get);

module.exports = router;