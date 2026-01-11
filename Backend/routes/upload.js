const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const auth = require('../middleware/auth');
const path = require('path');
const uuid = require('crypto').randomBytes;

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    const filename = `${Date.now()}-${file.originalname}`;
    return {
      filename,
      bucketName: 'uploads'
    };
  }
});
const upload = multer({ storage });

const { uploadVideo, streamVideo } = require('../controllers/videoController');

router.post('/', auth, upload.single('video'), uploadVideo);
router.get('/stream/:filename', streamVideo);

module.exports = router;
