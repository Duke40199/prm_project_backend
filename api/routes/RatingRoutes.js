'use strict';

/**
 * Role Route
 * path: /ratings
 */

let express = require('express');
let Controller = require('../controllers/RatingController');
let router = express.Router();

router.get('/', Controller.view.get);
router.post('/', Controller.create.post);
module.exports = router;