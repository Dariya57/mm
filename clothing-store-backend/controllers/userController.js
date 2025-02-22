
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
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
