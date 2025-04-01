const express = require('express');
const { addComment, getCommentsByVideo } = require('../controllers/comment.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/add/:videoId', authMiddleware, addComment);
router.get('/:videoId', getCommentsByVideo);

module.exports = router;
