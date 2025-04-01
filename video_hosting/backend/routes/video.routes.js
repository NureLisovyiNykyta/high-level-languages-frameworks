const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Получение всех видео
router.get('/', videoController.getAllVideos);

// Получение видео определенного пользователя
router.get('/channel/:userId', videoController.getUserVideos);

// Загрузка видео
router.post('/upload', authMiddleware, videoController.uploadVideo);

// Удаление видео
router.delete('/delete/:videoId', authMiddleware, videoController.deleteVideo);

module.exports = router;
