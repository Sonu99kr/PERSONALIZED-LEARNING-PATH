const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  steps: [
    {
      title: String,
      description: String,
    },
  ],
});
const Roadmap = mongoose.model("Roadmap", roadmapSchema);
module.exports = Roadmap;
