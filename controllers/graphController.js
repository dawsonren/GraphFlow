var Graph = require('../models/graph');
var User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;

// Display a particular Graph.
exports.graph = function(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(500).json({ message: 'Graph not found.' })
  }

  Graph.findById(req.params.id).then(graph => {
    if (graph) {
      res.json(graph)
    } else {
      return res.status(500).json({ message: 'Graph not found.' })
    }
  })
}

// Handle Graph create on POST
exports.graph_create_post = function(req, res) {
  User.findById(req.body.user).then(user => {
    if (user) {
      const newGraph = new Graph({
        name: req.body.name,
        nodes: [],
        edges: [],
        user_id: req.body.user,
      })
      newGraph
        .save()
        .then(graph => res.json(graph))
        .catch(err => console.log(err));
    } else {
      return res.status(500).json({ message: 'User not found.' })
    }
  })
}

// Handle Graph delete on POST
exports.graph_delete_post = function(req, res) {
  Graph.findByIdAndDelete(req.params.id, graph => {
    return res.status(200).json({ success: true })
  })
}

// Handle Graph update on POST
exports.graph_update_post = function(req, res) {
  Graph.findByIdAndUpdate(req.params.id, req.body, graph => {
    return res.status(200).json({ success: true })
  })
}
