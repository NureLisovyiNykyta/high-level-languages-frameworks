const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');
const userRoutes = require("./routes/user.routes");
const videoRoutes = require("./routes/video.routes");
const subscriptionRoutes = require("./routes/subscription.routes");
const likeRoutes = require("./routes/like.routes");
const commentRoutes = require("./routes/comment.routes");

dotenv.config();
const app = express();

// Middleware для JSON
app.use(express.json());
app.use(cors());

// Раздача загруженных видеофайлов
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos')));

// Подключение роутов
app.use('/api/videos', videoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
