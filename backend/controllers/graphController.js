var Graph = require('../models/graph');
const User = require('../models/User');

// Display a particular Graph.
exports.graph = function(req, res) {
  Graph.findById(req.params.id).then(graph => {
    if (graph) {
      res.json(graph)
    } else {
      return res.status(500).json({ message: 'Graph not found.' })
    }
  })
}

// Display the list of all Graphs
exports.graph_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph list')
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
  Graph.findById(req.params.id).remove(obj => {
    if (obj.ok !== 1) {
      return res.status(500).json({ message: 'Unable to delete graph.' })
    }
  })
}

// Handle Graph delete on POST
exports.graph_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph update POST')
}
