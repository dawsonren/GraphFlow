var express = require('express');
var router = express.Router();

// Require controller modules
var graph_controller = require('../controllers/graphController');

// GET home page.
router.get('/', function(req, res, next) {
  res.redirect('/graphs')
});

// GET request for all Graphs.
router.get('/graphs', graph_controller.graph_list);

module.exports = router;
