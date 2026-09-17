import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String, default: '' },
  subscriptions: [{ type: String }],
  history: [{ type: String }],
  likedVideos: [{ type: String }],
  watchLater: [{ type: String }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);

