import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Mock in-memory fallback stores if DB not connected
const userStores = {
  history: [],
  watchLater: [],
  likedVideos: []
};

// --- WATCH HISTORY ROUTES ---
router.get('/history', async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    if (userId) {
      const user = await User.findById(userId);
      if (user) return res.json(user.history || []);
    }
    res.json(userStores.history);
  } catch (err) {
    res.json(userStores.history);
  }
});

router.post('/history', async (req, res) => {
  try {
    const { video } = req.body;
    if (!video) return res.status(400).json({ msg: 'Video object required' });

    // Prepend video item
    const item = { ...video, watchedAt: new Date() };
    userStores.history = [item, ...userStores.history.filter(v => (v.id || v._id) !== (video.id || video._id))];

    res.json({ success: true, history: userStores.history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/history', (req, res) => {
  userStores.history = [];
  res.json({ success: true, message: 'History cleared' });
});

router.delete('/history/:id', (req, res) => {
  const { id } = req.params;
  userStores.history = userStores.history.filter(v => (v.id || v._id) !== id);
  res.json({ success: true, history: userStores.history });
});


// --- WATCH LATER ROUTES ---
router.get('/watchlater', (req, res) => {
  res.json(userStores.watchLater);
});

router.post('/watchlater', (req, res) => {
  const { video } = req.body;
  if (!video) return res.status(400).json({ msg: 'Video required' });

  const videoId = video.id || video._id;
  const exists = userStores.watchLater.some(v => (v.id || v._id) === videoId);

  if (exists) {
    userStores.watchLater = userStores.watchLater.filter(v => (v.id || v._id) !== videoId);
    res.json({ success: true, added: false, watchLater: userStores.watchLater });
  } else {
    userStores.watchLater = [{ ...video, addedAt: new Date() }, ...userStores.watchLater];
    res.json({ success: true, added: true, watchLater: userStores.watchLater });
  }
});

// --- LIKED VIDEOS ROUTES ---
router.get('/liked', (req, res) => {
  res.json(userStores.likedVideos);
});

router.post('/liked', (req, res) => {
  const { video } = req.body;
  if (!video) return res.status(400).json({ msg: 'Video required' });

  const videoId = video.id || video._id;
  const exists = userStores.likedVideos.some(v => (v.id || v._id) === videoId);

  if (exists) {
    userStores.likedVideos = userStores.likedVideos.filter(v => (v.id || v._id) !== videoId);
    res.json({ success: true, isLiked: false, likedVideos: userStores.likedVideos });
  } else {
    userStores.likedVideos = [{ ...video, likedAt: new Date() }, ...userStores.likedVideos];
    res.json({ success: true, isLiked: true, likedVideos: userStores.likedVideos });
  }
});

// --- PLAYLISTS ROUTES ---
const userPlaylists = [
  {
    id: 'pl_1',
    title: 'Web Dev Mastery 🚀',
    description: 'Best tutorials for fullstack JavaScript & React',
    isPrivate: false,
    createdAt: new Date(),
    videos: []
  }
];

router.get('/playlists', (req, res) => {
  res.json(userPlaylists);
});

router.post('/playlists', (req, res) => {
  const { title, description, isPrivate } = req.body;
  if (!title) return res.status(400).json({ msg: 'Playlist title required' });

  const newPlaylist = {
    id: `pl_${Date.now()}`,
    title,
    description: description || '',
    isPrivate: Boolean(isPrivate),
    createdAt: new Date(),
    videos: []
  };

  userPlaylists.unshift(newPlaylist);
  res.json({ success: true, playlist: newPlaylist, playlists: userPlaylists });
});

router.post('/playlists/:id/video', (req, res) => {
  const { id } = req.params;
  const { video } = req.body;
  const playlist = userPlaylists.find(p => p.id === id);

  if (!playlist) return res.status(404).json({ msg: 'Playlist not found' });

  const videoId = video.id || video._id;
  const exists = playlist.videos.some(v => (v.id || v._id) === videoId);

  if (exists) {
    playlist.videos = playlist.videos.filter(v => (v.id || v._id) !== videoId);
    res.json({ success: true, added: false, playlist });
  } else {
    playlist.videos.unshift(video);
    res.json({ success: true, added: true, playlist });
  }
});

router.delete('/playlists/:id', (req, res) => {
  const { id } = req.params;
  const index = userPlaylists.findIndex(p => p.id === id);
  if (index > -1) {
    userPlaylists.splice(index, 1);
  }
  res.json({ success: true, playlists: userPlaylists });
});

export default router;