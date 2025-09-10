const express = require("express");
const {
  createNewRoadmap,
  getAllRoadmaps,
  getRoadmapById,
} = require("../Controllers/roadmapController");
const authMiddleware = require("../Middleware/middlewareAuth");

const router = express.Router();

router.post("/", authMiddleware, createNewRoadmap);
router.get("/", getAllRoadmaps);
router.get("/:id", getRoadmapById);

module.exports = router;
