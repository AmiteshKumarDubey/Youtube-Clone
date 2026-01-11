const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  video: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);


