var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GraphSchema = new Schema({
  name: {type: String, required: true},
  nodes: [{type: Schema.Types.ObjectId, ref: 'Node', required: true}],
  edges: [{type: Schema.Types.ObjectId, ref: 'Edge', required: true}],
});

GraphSchema.virtual('url').get(() => {
  return `graphs/${this._id}`;
});

module.exports = mongoose.model('Graph', GraphSchema);
