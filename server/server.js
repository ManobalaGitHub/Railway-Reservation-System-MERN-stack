const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/railway", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User model
const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}));

// Login Route: Add user if new, return data if exists
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      if (user.password === password) {
        return res.json({ success: true, username: user.username, email: user.email });
      } else {
        return res.status(401).json({ success: false, message: "Wrong password" });
      }
    } else {
      // Create new user
      const newUser = new User({
        username,
        email: `${username}@example.com`, // Generate dummy email
        password,
      });
      await newUser.save();

      return res.json({ success: true, username: newUser.username, email: newUser.email });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get all users (for frontend display)
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});
