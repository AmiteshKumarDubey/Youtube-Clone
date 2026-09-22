import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// Fallback in-memory comments store
const mockComments = {
  '4TWR90KJl84': [
    {
      _id: 'c_101',
      video: '4TWR90KJl84',
      username: 'CodeMaster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CodeMaster',
      text: 'This video is an absolute masterpiece! Loved the music production. 🔥',
      likes: 342,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      _id: 'c_102',
      video: '4TWR90KJl84',
      username: 'ReactDev',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ReactDev',
      text: 'Watching this while building my React app! Amazing content. 🚀',
      likes: 128,
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
    }
  ]
};

// GET comments for a video
router.get('/:videoId', async (req, res) => {
  const { videoId } = req.params;
  try {
    const comments = await Comment.find({ video: videoId }).sort({ createdAt: -1 });
    if (comments && comments.length > 0) {
      return res.json(comments);
    }
    res.json(mockComments[videoId] || []);
  } catch (err) {
    res.json(mockComments[videoId] || []);
  }
});

// POST a new comment
router.post('/:videoId', async (req, res) => {
  const { videoId } = req.params;
  const { text, username, avatar } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ msg: 'Comment text is required' });
  }

  const newComment = {
    _id: `c_${Date.now()}`,
    video: videoId,
    username: username || 'Guest Creator',
    avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username || 'Guest')}`,
    text: text.trim(),
    likes: 0,
    createdAt: new Date().toISOString()
  };

  try {
    const created = await Comment.create(newComment);
    if (!mockComments[videoId]) mockComments[videoId] = [];
    mockComments[videoId].unshift(created);
    res.json(created);
  } catch (err) {
    if (!mockComments[videoId]) mockComments[videoId] = [];
    mockComments[videoId].unshift(newComment);
    res.json(newComment);
  }
});

// LIKE a comment
router.post('/like/:commentId', (req, res) => {
  const { commentId } = req.params;
  let found = null;

  Object.values(mockComments).forEach(list => {
    const item = list.find(c => c._id === commentId);
    if (item) {
      item.likes += 1;
      found = item;
    }
  });

  res.json({ success: true, comment: found });
});

// DELETE a comment
router.delete('/:commentId', (req, res) => {
  const { commentId } = req.params;

  Object.keys(mockComments).forEach(videoId => {
    mockComments[videoId] = mockComments[videoId].filter(c => c._id !== commentId);
  });

  res.json({ success: true, message: 'Comment deleted' });
});

export default router;