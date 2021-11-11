var Graph = require('../models/graph');

// Display the list of all Graphs
exports.graph_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph list')
}

// Display the list of all Nodes.
exports.node_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Node list')
}

// Display the list of all Edges.
exports.edge_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Edge list')
}

// Display a particular Graph.
exports.graph = function(req, res) {
  res.send(`NOT IMPLEMENTED: Graph ${req.params.id}`)
}

// Display Graph create form on GET
exports.graph_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph create GET')
}

// Handle Graph create on POST
exports.graph_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph create POST')
}

// Display Graph delete form on GET
exports.graph_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph delete GET')
}

// Handle Graph delete on POST
exports.graph_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph delete POST')
}

// Display Graph update form on GET
exports.graph_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph update GET')
}

// Handle Graph delete on POST
exports.graph_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph update POST')
}
