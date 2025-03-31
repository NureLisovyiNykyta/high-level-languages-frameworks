// models/video.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./user');

class Video extends Model {}

Video.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    video_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Video',
    tableName: 'videos',
    schema: 'video_hosting',
    timestamps: false,
  }
);

Video.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Video;
