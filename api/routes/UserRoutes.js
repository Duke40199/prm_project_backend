'use strict';

/**
 * User Route
 * path: /users
 */

let express = require('express');
let Controller = require('../controllers/UserController');
let router = express.Router();

router.get('/', Controller.view.get);
router.get('/:username', Controller.view_one.get);
router.put('/:username/avatar',Controller.update_avatar_url.put);
router.put('/:username', Controller.set_avail_status.put);
module.exports = router;