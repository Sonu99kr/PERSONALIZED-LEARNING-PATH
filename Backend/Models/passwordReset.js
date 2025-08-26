const mongoose = require("mongoose");
const passwordResetSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
    index: true,
  },
  token: {
    type: "String",
    required: true,
    index: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 3600,
  },
});

const passwordReset = mongoose.model("passwordReset", passwordResetSchema);
module.exports = passwordReset;
