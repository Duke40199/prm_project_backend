'use strict';

/**
 * Post Route
 * path: /tasks
 */

let express = require('express');
let Controller = require('../controllers/TaskController');
let router = express.Router();

router.get('/', Controller.view.get);
router.get('/reviews', Controller.view_review_tasks.get);
router.post('/create', Controller.create.post);
router.put('/update', Controller.update.put);
// router.put('/:postId', Controller.set_avail_status.put);

module.exports = router;