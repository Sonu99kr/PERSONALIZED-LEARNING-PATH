const express = require("express");
const {
  assignRoadmap,
  getUserRoadmap,
  updateSteps,
} = require("../Controllers/userRoadmapcontrollers");

const router = express.Router();

router.post("/", assignRoadmap);
router.get("/:userId", getUserRoadmap);
router.put("/update-steps", updateSteps);

module.exports = router;
