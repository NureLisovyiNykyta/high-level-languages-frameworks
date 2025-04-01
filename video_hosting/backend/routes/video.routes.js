const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const { getAllVideos, getUserVideos, uploadVideo, deleteVideo } = require('../controllers/video.controller');
const { authMiddleware } = require("../middleware/auth.middleware");

// Получение всех видео
router.get('/', getAllVideos);

// Получение видео определенного пользователя
router.get('/channel/:userId', getUserVideos);

// Загрузка видео
router.post('/upload',upload.single('file'), authMiddleware, uploadVideo);

// Удаление видео
router.delete('/delete/:videoId', authMiddleware, deleteVideo);

module.exports = router;
