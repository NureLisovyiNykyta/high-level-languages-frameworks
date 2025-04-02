const Comment = require('../models/comment');
const Video = require('../models/video');

exports.addComment = async (req, res) => {
    try {
        const { videoId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        const video = await Video.findByPk(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        if (!content || content.trim() === '') {
            return res.status(400).json({ message: 'Comment content cannot be empty' });
        }
        

        const comment = await Comment.create({ user_id: userId, video_id: videoId, content });

        res.status(201).json({ message: 'Comment added successfully', comment });

    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Internal server error' + error });
    }
};

exports.getCommentsByVideo = async (req, res) => {
    try {
        const { videoId } = req.params;

        const video = await Video.findByPk(videoId);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        const comments = await Comment.findAll({
            where: { video_id: videoId },
            include: [{ model: require('../models/user'), attributes: ['id', 'username'] }],
            order: [['created_at', 'DESC']],
        });

        res.status(200).json(comments);

    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
