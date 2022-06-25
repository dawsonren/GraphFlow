var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GraphSchema = new Schema({
  name: {type: String, required: true},
  nodes: [new Schema({
    display_data: {
      top: Number,
      left: Number,
      radius: Number
    },
    id: String,
    name: String,
    type: String,
    demand: Number
  })],
  edges: [new Schema({
    display_data: {
      fromX: Number,
      fromY: Number,
      toX: Number,
      toY: Number,
      curve: Number
    },
    from: String,
    to: String,
    cost: Number,
    min_flow: Number,
    max_flow: Number,
    id: String
  })],
  user_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

GraphSchema.virtual('url').get(() => {
  return `graphs/${this._id}`;
});

module.exports = mongoose.model('Graph', GraphSchema);
