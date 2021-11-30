var express = require('express');
var router = express.Router();

// Require controller modules
var graph_controller = require('../controllers/graphController');


/// GRAPH ROUTES ///

// GET request for a particular Graph.
router.get('/:id', graph_controller.graph);

// POST request for creating a Graph.
router.post('/create', graph_controller.graph_create_post);

// POST request for deleting a Graph.
router.post('/:id/delete', graph_controller.graph_delete_post);

// POST request for updating a Graph.
router.post('/:id/update', graph_controller.graph_update_post);

module.exports = router;
