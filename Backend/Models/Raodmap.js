const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Frontend",
        "Backend",
        "DevOps",
        "Mobile",
        "Data Science",
        "AI/ML",
        "Design",
        "Other",
      ],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    estimatedTime: {
      type: String, // e.g., "6 months", "1 year"
      required: true,
    },
    color: {
      type: String,
      default: "#3b82f6",
    },
    icon: {
      type: String,
      default: "📚",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    steps: [
      {
        id: String,
        title: String,
        description: String,
        resources: [
          {
            title: String,
            url: String,
            type: {
              type: String,
              enum: ["article", "video", "course", "book", "documentation"],
            },
          },
        ],
        prerequisites: [String],
        estimatedTime: String,
        difficulty: {
          type: String,
          enum: ["Easy", "Medium", "Hard"],
        },
        position: {
          x: Number,
          y: Number,
        },
        connections: [String], // IDs of connected steps
      },
    ],
    metadata: {
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
      version: {
        type: String,
        default: "1.0.0",
      },
      contributors: [String],
    },
  },
  {
    timestamps: true,
  }
);
const Roadmap = mongoose.model("Roadmap", roadmapSchema);
module.exports = Roadmap;
