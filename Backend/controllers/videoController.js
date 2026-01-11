import Video from '../models/Video.js';

export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        video.views += 1;
        await video.save();
        res.json(video);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};