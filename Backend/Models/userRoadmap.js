const mongoose = require("mongoose");

const userRoadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roadmap",
    required: true,
  },
  steps: [
    {
      stepIndex: Number,
      title: String,
      description: String,
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const userRoadmap = mongoose.model("userRoadmap", userRoadmapSchema);
module.exports = userRoadmap;
