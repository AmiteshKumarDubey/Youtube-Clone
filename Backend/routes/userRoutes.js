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

// --- SUBSCRIPTIONS ROUTES ---
const userSubscriptions = ['T-Series', 'SET India', 'Technical Guruji', 'CodeWithHarry'];

router.get('/subscriptions', (req, res) => {
  res.json(userSubscriptions);
});

router.post('/subscriptions', (req, res) => {
  const { channel } = req.body;
  if (!channel) return res.status(400).json({ msg: 'Channel name required' });

  const index = userSubscriptions.indexOf(channel);
  if (index > -1) {
    userSubscriptions.splice(index, 1);
    res.json({ success: true, isSubscribed: false, subscriptions: userSubscriptions });
  } else {
    userSubscriptions.push(channel);
    res.json({ success: true, isSubscribed: true, subscriptions: userSubscriptions });
  }
});

export default router;