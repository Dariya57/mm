
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try {
        console.log("Received body:", req.body); // Debugging log

        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};





const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt with:", email, password);

    try {
        const user = await User.findOne({ email });
        console.log("User found in DB:", user);

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        console.log("Stored password hash:", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);

        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        console.log("Generated Token:", token);

        res.json({ token, user: { id: user._id, name: user.username, email: user.email, role: user.role } });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { registerUser, loginUser };
