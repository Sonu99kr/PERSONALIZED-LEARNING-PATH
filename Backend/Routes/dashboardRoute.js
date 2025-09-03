const express = require("express");
const router = express.Router();
const authMiddleWare = require("../Middleware/middlewareAuth");
const User = require("../Models/Users");

router.get("/stats", authMiddleWare, (req, res) => {
  try {
    const user = req.user;
    const stats = {
      totalCourses: user.totalCourses,
      completedCourses: user.completedCourses,
      level: user.level,
      nextMilestone: user.nextMilestone,
    };
    res.json(stats);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching stats" });
  }
});
router.get("/recent-activity", authMiddleWare, (req, res) => {
  try {
    const user = req.user;
    const recentActivity = user.recentActivity
      .sort((a, b) => b.time - a.time)
      .slice(0, 5);
    res.json(recentActivity);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching recent activity" });
  }
});

router.get("/learning-path", authMiddleWare, (req, res) => {
  try {
    const user = req.user;
    res.json(user.learningPath);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching learning path" });
  }
});

module.exports = router;
