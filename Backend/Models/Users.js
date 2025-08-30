const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    completedCourses: { type: Number, default: 0 },
    totalCourses: { type: Number, default: 0 },
    level: { type: String, default: "Beginner" },
    nextMilestone: { type: String, default: "Complete more courses" },
    recentActivity: [
      {
        action: String,
        type: String,
        time: { type: Date, default: Date.now },
      },
    ],
    learningPath: [
      {
        title: { type: String },
        description: { type: String },
        completed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
