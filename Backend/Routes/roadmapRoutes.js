const express = require("express");
const {
  createNewRoadmap,
  getAllRoadmaps,
  getRoadmapById,
} = require("../Controllers/roadmapController");

const router = express.Router();

router.post("/", createNewRoadmap);
router.get("/", getAllRoadmaps);
router.get("/:id", getRoadmapById);

module.exports = router;
