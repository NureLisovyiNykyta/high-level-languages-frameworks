const express = require("express");
const router = express.Router();
const { register, login, getProfile, getAllProfile } = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.get("/", getAllProfile);

module.exports = router;
