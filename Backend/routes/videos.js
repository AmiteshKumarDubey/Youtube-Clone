const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  listVideos, getVideoById, incrementView, likeVideo,
  addComment, getComments
} = require('../controllers/videoController');

router.get('/', listVideos);
router.get('/:id', getVideoById);
router.post('/:id/view', incrementView);
router.post('/:id/like', auth, likeVideo);
router.post('/:id/comments', auth, addComment);
router.get('/:id/comments', getComments);

module.exports = router;
