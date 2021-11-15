var Graph = require('../models/graph');

// Display a particular Graph.
exports.graph = function(req, res) {
  res.send(`NOT IMPLEMENTED: Graph ${req.params.id}`)
}

// Display the list of all Graphs
exports.graph_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph list')
}

// Handle Graph create on POST
exports.graph_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph create POST')
}

// Handle Graph delete on POST
exports.graph_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph delete POST')
}

// Handle Graph delete on POST
exports.graph_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph update POST')
}
