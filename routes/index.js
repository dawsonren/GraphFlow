var express = require('express');
var router = express.Router();

// Require controller modules
var graph_controller = require('../controllers/graphController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/graphs')
});

/// GRAPH ROUTES ///

// GET request for creating a Graph.
router.get('/graph/create', graph_controller.graph_create_get);

// POST request for creating a Graph.
router.post('/graph/create', graph_controller.graph_create_post);

// GET request for deleting a Graph.
router.get('/graph/:id/delete', graph_controller.graph_delete_get);

// POST request for deleting a Graph.
router.post('/graph/:id/delete', graph_controller.graph_delete_post);

// GET request for updating a Graph.
router.get('/graph/:id/update', graph_controller.graph_update_get);

// POST request for updating a Graph.
router.post('/graph/:id/update', graph_controller.graph_update_post);

// GET request for all Graphs.
router.get('/graphs', graph_controller.graph_list);

module.exports = router;
