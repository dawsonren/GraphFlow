var ObjectId = require('mongoose').Types.ObjectId;
var Graph = require('../models/graph');
var User = require('../models/User');

// Display a particular Graph.
exports.graph = function(req, res) {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(500).json({ message: 'Invalid URL. '})
  }

  Graph.findById(req.params.id).then(graph => {
    if (graph) {
      res.json(graph)
    } else {
      return res.status(500).json({ message: 'Graph not found.' })
    }
  })
}

// Display the list of all Graphs owned by a specific user.
exports.graph_list = function(req, res) {
  res.send('NOT IMPLEMENTED: Graph list')
}

// Handle Graph create on POST
exports.graph_create_post = function(req, res) {
  const id = mongoose.Types.ObjectId(req.body.user)
  User.findById(id).then(user => {
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
  Graph.findByIdAndRemove(req.params.id, obj => {
    if (obj.ok !== 1) {
      return res.status(500).json({ message: 'Unable to delete graph.' })
    }
  })
}

// Handle Graph delete on POST
exports.graph_update_post = async function(req, res) {
  // Overwrite
  const doc = await Graph.findById(req.params.id)
  doc.overwrite({...req.body})
  await doc.save()

  // Refetch
  Graph.findById(req.params.id).then(graph => {
    if (graph) {
      res.json(graph)
    } else {
      return res.status(500).json({ message: 'Unexpected server error during update.' })
    }
  })
}
