const Subscription = require("../models/subscription");
const User = require("../models/user");

exports.subscribe = async (req, res) => {
    try {
        const { channelId } = req.params;
        const userId = req.user.id;

        if (userId === channelId) {
            return res.status(400).json({ message: "You cannot subscribe to yourself." });
        }

        const existingSubscription = await Subscription.findOne({ where: { subscriber_id: userId, channel_id: channelId } });
        if (existingSubscription) {
            return res.status(400).json({ message: "Already subscribed." });
        }

        await Subscription.create({ subscriber_id: userId, channel_id: channelId });
        res.status(201).json({ message: "Subscribed successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.unsubscribe = async (req, res) => {
    try {
        const { channelId } = req.params;
        const userId = req.user.id;

        const deleted = await Subscription.destroy({ where: { subscriber_id: userId, channel_id: channelId } });
        if (!deleted) {
            return res.status(400).json({ message: "Subscription not found." });
        }

        res.status(200).json({ message: "Unsubscribed successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.getSubscriptions = async (req, res) => {
    try {
        const userId = req.user.id;
        const subscriptions = await Subscription.findAll({
            where: { subscriber_id: userId },
            include: { model: User, as: "channel" },
        });
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

exports.isSubscribed = async (req, res) => {
    try {
        const { channelId } = req.params;
        const userId = req.user.id;

        const subscription = await Subscription.findOne({ where: { subscriber_id: userId, channel_id: channelId } });
        res.status(200).json({ subscribed: !!subscription });
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};
