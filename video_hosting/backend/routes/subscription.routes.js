const express = require("express");
const { subscribe, unsubscribe, getSubscriptions, isSubscribed } = require("../controllers/subscription.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/subscribe/:channelId", authMiddleware, subscribe);
router.delete("/unsubscribe/:channelId", authMiddleware, unsubscribe);
router.get("/subscriptions", authMiddleware, getSubscriptions);
router.get("/is-subscribed/:channelId", authMiddleware, isSubscribed);

module.exports = router;