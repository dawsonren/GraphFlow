#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Node = require('./models/node')
var Edge = require('./models/edge')
var Graph = require('./models/graph')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var nodes = []
var edges = []
var graphs = []

function nodeCreate(nodeIndex, data, cb) {
  nodedetail = { nodeIndex: nodeIndex, data: data }

  var node = new Node(nodedetail);

  node.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Node: ' + node);
    nodes.push(node)
    cb(null, node)
  }  );
}

function edgeCreate(from, to, weight, cb) {
  var edge = new Edge({ from: from, to: to, weight: weight });

  edge.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Edge: ' + edge);
    edges.push(edge)
    cb(null, edge);
  }   );
}

function graphCreate(name, nodes, edges, cb) {
  graphdetail = {
    name: name,
    nodes: nodes,
    edges: edges,
  }

  var graph = new Graph(graphdetail);
  graph.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Graph: ' + graph);
    graphs.push(graph)
    cb(null, graph)
  }  );
}

function createNodesEdges(cb) {
    async.series([
        function(callback) {
          nodeCreate(0, "Auckland", callback);
        },
        function(callback) {
          nodeCreate(1, "Berlin", callback);
        },
        function(callback) {
          nodeCreate(2, "Chicago", callback);
        },
        function(callback) {
          nodeCreate(3, "Djibouti", callback);
        },
        function(callback) {
          nodeCreate(4, "Exeter", callback);
        },
        function(callback) {
          nodeCreate(5, "Fort Worth", callback);
        },
        function(callback) {
          edgeCreate(nodes[0], nodes[1], 4, callback);
        },
        function(callback) {
          edgeCreate(nodes[0], nodes[2], 3, callback);
        },
        function(callback) {
          edgeCreate(nodes[1], nodes[2], 5, callback);
        },
        function(callback) {
          edgeCreate(nodes[1], nodes[3], 2, callback);
        },
        function(callback) {
          edgeCreate(nodes[3], nodes[4], 2, callback);
        },
        function(callback) {
          edgeCreate(nodes[4], nodes[1], 4, callback);
        },
        function(callback) {
          edgeCreate(nodes[4], nodes[0], 4, callback);
        },
        function(callback) {
          edgeCreate(nodes[4], nodes[5], 6, callback);
        },
        function(callback) {
          edgeCreate(nodes[2], nodes[3], 7, callback);
        },
        ],
        // optional callback
        cb);
}


function createGraphs(cb) {
    async.parallel([
        function(callback) {
          graphCreate("Airports", nodes, edges, callback);
        }
      ],
      // optional callback
      cb);
}

const cb = (err, results) => {
    if (err) {
        console.log('FINAL ERR: ' + err);
    }
    else {
        console.log('Graphs : ' + graphs);

    }
    // All done, disconnect from database
    mongoose.connection.close();
}

async.series([
    createNodesEdges,
    createGraphs,
], cb);
