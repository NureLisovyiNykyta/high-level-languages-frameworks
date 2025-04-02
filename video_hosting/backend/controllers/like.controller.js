const Like = require('../models/like');
const Video = require('../models/video');

exports.likeVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;

        const video = await Video.findByPk(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const existingLike = await Like.findOne({ where: { user_id: userId, video_id: videoId } });

        if (existingLike) {
            return res.status(400).json({ message: 'You have already liked this video' });
        }

        await Like.create({ user_id: userId, video_id: videoId });
        res.status(201).json({ message: 'Video liked successfully' });

    } catch (error) {
        console.error('Error liking video:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.unlikeVideo = async (req, res) => {
    try {
        const { videoId } = req.params;
        const userId = req.user.id;

        const like = await Like.findOne({ where: { user_id: userId, video_id: videoId } });

        if (!like) {
            return res.status(404).json({ message: 'Like not found' });
        }

        await like.destroy();
        res.status(200).json({ message: 'Like removed successfully' });

    } catch (error) {
        console.error('Error unliking video:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
