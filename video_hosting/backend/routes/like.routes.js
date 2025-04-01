const express = require('express');
const { likeVideo, unlikeVideo } = require('../controllers/like.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/add/:videoId', authMiddleware, likeVideo);
router.delete('/delete/:videoId', authMiddleware, unlikeVideo);

module.exports = router;
