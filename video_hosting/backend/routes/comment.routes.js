const express = require('express');
const { addComment, getCommentsByVideo } = require('../controllers/comment.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/add/:videoId', authMiddleware, addComment);
router.get('/comments/:videoId', getCommentsByVideo);

module.exports = router;
