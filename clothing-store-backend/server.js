require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");


const app = express();

//Connect to Database
connectDB();

//  Middleware
app.use(express.json()); // This must be before routes

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "clothing-store-backend/public", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
