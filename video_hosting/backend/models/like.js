const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./user');
const Video = require('./video');

class Like extends Model {}

Like.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
    schema: 'video_hosting',
    timestamps: false,
  }
);

Like.belongsTo(User, { foreignKey: 'user_id' });
Like.belongsTo(Video, { foreignKey: 'video_id' });
module.exports = Like;
