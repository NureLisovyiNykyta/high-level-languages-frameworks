const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateToken } = require("../middleware/auth.middleware");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: "Email is already in use." });
        }

        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({ message: "Username is already in use." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password_hash: hashedPassword
        });

        const token = generateToken(user);
        res.status(201).json({ token, user });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = generateToken(user);
        res.json({ token, user });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error." });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "username", "email", "avatar_url", "created_at"]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(user);

    } catch (error) {
        console.error("Profile error:", error);
        res.status(500).json({ message: "Server error." });
    }
};
