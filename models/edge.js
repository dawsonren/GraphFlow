var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EdgeSchema = new Schema({
  from: {type: Schema.Types.ObjectId, ref: 'Node', required: true},
  to: {type: Schema.Types.ObjectId, ref: 'Node', required: true},
  weight: Number,
});

EdgeSchema.virtual('url').get(() => {
  return `edges/${this._id}`;
});

module.exports = mongoose.model('Edge', EdgeSchema);
