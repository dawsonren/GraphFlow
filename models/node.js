var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Mixed = Schema.Types.Mixed;

var Integer = {
  type: Number,
  required: true,
  get: v => Math.round(v),
  set: v => Math.round(v),
}

var NodeSchema = new Schema({
  nodeIndex: Integer,
  data: String,
})

NodeSchema.virtual('url').get(() => {
  return `nodes/${this._id}`
})

module.exports = mongoose.model('Node', NodeSchema);
