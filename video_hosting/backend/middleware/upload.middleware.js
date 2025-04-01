const multer = require('multer');
const path = require('path');

// Указываем, куда сохранять файлы
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/'); // Сохраняем в папку uploads/videos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Формат: timestamp-random.ext
  },
});

// Ограничение по размеру и форматам видео
const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB ограничение
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mkv|avi|mov/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Only video files are allowed!'));
    }
  },
});

module.exports = upload;
