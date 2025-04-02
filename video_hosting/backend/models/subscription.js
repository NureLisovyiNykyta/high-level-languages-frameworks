const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./user');

class Subscription extends Model {}

Subscription.init(
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
    modelName: 'Subscription',
    tableName: 'subscriptions',
    schema: 'video_hosting',
    timestamps: false,
  }
);

Subscription.belongsTo(User, { foreignKey: 'subscriber_id', as: 'Subscriber' });
Subscription.belongsTo(User, { foreignKey: 'channel_id', as: 'Channel' });

module.exports = Subscription;
