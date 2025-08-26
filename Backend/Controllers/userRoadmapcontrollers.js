const userRoadmap = require("../Models/userRoadmap");
const UserRoadmap = require("../Models/userRoadmap");

async function assignRoadmap(req, res) {
  try {
    const { userId, roadmapId, steps } = req.body;
    const userRoadmap = await UserRoadmap.create({ userId, roadmapId, steps });
    res.status(201).json(userRoadmap);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

async function getUserRoadmap(req, res) {
  try {
    const userRoadmap = await UserRoadmap.findOne({
      userId: req.params.userId,
    }).populate("roadmapId");
    if (!userRoadmap) return res.status(404).json({ error: "Not found" });
    res.json(userRoadmap);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

async function updateSteps(req, res) {
  try {
    const { userId, roadmapId, stepIndex } = req.body;
    const userRoadmap = await UserRoadmap.findOne({ userId, roadmapId });
    if (!userRoadmap) return res.status(404).json({ error: "Not found" });

    if (stepIndex < 0 || stepIndex >= userRoadmap.steps.length) {
      return res.status(400).json({ error: "Invalid step index" });
    }
    userRoadmap.steps[stepIndex].completed = true;
    await userRoadmap.save();

    res.json(userRoadmap);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  assignRoadmap,
  getUserRoadmap,
  updateSteps,
};
