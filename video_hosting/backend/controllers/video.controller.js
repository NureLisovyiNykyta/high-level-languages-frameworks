const Video = require('../models/video');
const fs = require('fs');
const path = require('path');
const serverUrl = process.env.SERVER_URL;

// Получение всех видео
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();
    return res.json(videos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error getting videos' });
  }
};

// Получение видео по user_id
exports.getUserVideos = async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const videos = await Video.findAll({
      where: { user_id: userId },
    });
    
    if (videos.length === 0) {
      return res.status(404).json({ message: 'No videos found for this user' });
    }
    
    return res.json(videos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error getting user videos' });
  }
};


// Загрузка видео
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, description } = req.body;
    const userId = req.user.id;

    const videoUrl = `${serverUrl}/uploads/videos/${req.file.filename}`; // Генерируем URL

    const newVideo = await Video.create({
      title,
      description,
      video_url: videoUrl,
      user_id: userId,
    });

    return res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error uploading video' });
  }
};


// Удаление видео
exports.deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.id; // ID текущего пользователя

    // Найти видео в базе
    const video = await Video.findOne({ where: { id: videoId } });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Проверить, является ли пользователь владельцем видео
    if (video.user_id !== userId) {
      return res.status(403).json({ message: 'You are not allowed to delete this video' });
    }

    // Удаление файла с сервера
    const filePath = path.join(__dirname, '..', 'uploads', 'videos', path.basename(video.video_url));

    fs.unlink(filePath, async (err) => {
      if (err && err.code !== 'ENOENT') {
        console.error(err);
        return res.status(500).json({ message: 'Error deleting video file' });
      }

      // Удаление видео из базы данных
      await video.destroy();

      return res.status(200).json({ message: 'Video deleted successfully' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting video' });
  }
};
