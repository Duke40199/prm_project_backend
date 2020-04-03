'use strict';

/**
 * status Route
 * path: /status
 */

let express = require('express');
let Controller = require('../controllers/StatusController');
let router = express.Router();

router.get('/', Controller.view.get);

module.exports = router;