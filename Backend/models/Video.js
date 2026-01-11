import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    videoUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    duration: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Video', videoSchema);