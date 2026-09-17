import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  video: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: { type: String, required: true },
  avatar: { type: String, default: '' },
  text: { type: String, required: true },
  likes: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);



