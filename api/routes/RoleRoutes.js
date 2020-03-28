'use strict';

/**
 * Role Route
 * path: /roles
 */

let express = require('express');
let Controller = require('../controllers/RoleController');
let router = express.Router();

router.get('/', Controller.view.get);

module.exports = router;