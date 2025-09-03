const express = require("express");
const router = express.Router();

const User = require("../Models/Users");
const authMiddleware = require("../Middleware/middlewareAuth");

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
