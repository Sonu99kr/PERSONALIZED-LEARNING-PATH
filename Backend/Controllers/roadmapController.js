const Roadmap = require("../Models/Raodmap");

async function createNewRoadmap(req, res) {
  try {
    const {
      title,
      description,
      steps,
      category,
      difficulty,
      estimatedTime,
      color,
      icon,
      isPublished,
    } = req.body;

    if (!title || !description || !category || !difficulty || !estimatedTime) {
      return res.status(400).json({
        error:
          "Missing required fields: title, description, category, difficulty, estimatedTime",
      });
    }

    const roadmap = await Roadmap.create({
      title,
      description,
      steps,
      category,
      difficulty,
      estimatedTime,
      color,
      icon,
      isPublished,
    });
    res.status(201).json(roadmap);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

async function getAllRoadmaps(req, res) {
  try {
    const allRoadmap = await Roadmap.find({});
    res.json(allRoadmap);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

async function getRoadmapById(req, res) {
  try {
    const roadmapById = await Roadmap.findById(req.params.id);
    if (!roadmapById)
      return res.status(404).json({ error: "Roadmap not found!" });
    res.json(roadmapById);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {
  createNewRoadmap,
  getAllRoadmaps,
  getRoadmapById,
};
