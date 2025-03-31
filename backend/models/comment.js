const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./user');
const Video = require('./video');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    schema: 'video_hosting',
    timestamps: false,
  }
);

Comment.belongsTo(User, { foreignKey: 'user_id' });
Comment.belongsTo(Video, { foreignKey: 'video_id' });

module.exports = Comment;
