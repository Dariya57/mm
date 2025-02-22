const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all orders for the logged-in user
router.get("/", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate("products");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Place a new order
router.post("/", protect, async (req, res) => {
    try {
        const { products } = req.body;
        const order = new Order({ user: req.user.id, products });
        await order.save();
        res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error placing order" });
    }
});
module.exports = { protect };

module.exports = router;
